/** @type {import('@sveltejs/adapter-vercel').Config} */
export const config = {
  runtime: 'edge'
};

import { google } from 'googleapis';

export const GET = ({ url, params }) => {
  return new Response(String(url.searchParams.get("test")))
}

