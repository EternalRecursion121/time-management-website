/** @type {import('@sveltejs/adapter-vercel').Config} */
export const config = {
  runtime: 'edge'
};

import { error } from '@sveltejs/kit';
import { retrieveTaskData } from '$lib/server/api-utils';

