import { SvelteKitAuth } from "@auth/sveltekit";
import GoogleProvider from "@auth/core/providers/google";
import {GOOGLE_ID, GOOGLE_SECRET} from "$env/static/private";

export const handle = SvelteKitAuth({
  providers: [ GoogleProvider({ 
    clientId: GOOGLE_ID, 
    clientSecret: GOOGLE_SECRET, 
    authorization: { 
      params: { 
        scope: "openid email profile https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/drive.appdata",
        prompt: "consent",
        access_type: "offline",
        response_type: "code"
      },
    }
  })],
  callbacks: {
     async jwt({ token, account }) {
      if (account) {
        // Save the access token and refresh token in the JWT on the initial login
        return {
          ...token,
          access_token: account.access_token,
          expires_at: Date.now() + account.expires_in * 1000,
          refresh_token: account.refresh_token,
        }
      } else if (Date.now() < token.expires_at) {
        // If the access token has not expired yet, return it
        return token
      } else {
        // If the access token has expired, try to refresh it
        try {
          // https://accounts.google.com/.well-known/openid-configuration
          // We need the `token_endpoint`.
          const response = await fetch("https://oauth2.googleapis.com/token", {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              client_id: process.env.GOOGLE_ID,
              client_secret: process.env.GOOGLE_SECRET,
              grant_type: "refresh_token",
              refresh_token: token.refresh_token,
            }),
            method: "POST",
          })

          const tokens: TokenSet = await response.json()

          if (!response.ok) throw tokens

          return {
            ...token, // Keep the previous token properties
            access_token: tokens.access_token,
            expires_at: Date.now() + tokens.expires_in * 1000,
            // Fall back to old refresh token, but note that
            // many providers may only allow using a refresh token once.
            refresh_token: tokens.refresh_token ?? token.refresh_token,
          }
        } catch (error) {
          console.error("Error refreshing access token", error)
          // The error property will be used client-side to handle the refresh token error
          return { ...token, error: "RefreshAccessTokenError" as const }
        }
      }
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.error = token.error;

      return session
    },
  }
})