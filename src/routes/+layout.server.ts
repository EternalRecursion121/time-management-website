import type { LayoutServerLoad } from "./$types";
import { decode } from '@auth/core/jwt';
import { AUTH_SECRET } from "$env/static/private";
import { dev } from '$app/environment';

export const load: LayoutServerLoad = async (event) => {
  return {
    session: await event.locals.getSession(),
    token: await decode({token:  event.cookies.get(dev ? "next-auth.session-token": "__Secure-next-auth.session-token"), secret:AUTH_SECRET}).catch(() => null)
  }
}