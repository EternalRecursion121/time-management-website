import { SvelteKitAuth } from "@auth/sveltekit"
import GoogleProvider from "@auth/core/providers/google"
import {GOOGLE_ID, GOOGLE_SECRET} from "$env/static/private"

console.log(GOOGLE_SECRET);

export const handle = SvelteKitAuth({
  providers: [ GoogleProvider({ clientId: GOOGLE_ID, clientSecret: GOOGLE_SECRET }) ],
})