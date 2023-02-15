/** @type {import('@sveltejs/adapter-vercel').Config} */
export const config = {
  runtime: 'edge'
};

import { error } from '@sveltejs/kit';
import { constructTask, retrieveTaskData, uploadTaskData} from '$lib/server/api-utils';

export const GET = async ({ url, request }) => {

  let authorisation = request.headers.get('Authorization');
  if (!authorisation) {
    throw error(401, 'No access token provided');
  }

  const taskId = url.searchParams.get('taskId')
  if (!taskId) {
    return error(404, "Missing taskId in request")
  }
  const taskData:Array<Object> = await retrieveTaskData(authorisation);
  const task = taskData.find(task => task.id === taskId)

  if (!task) {
    return error(404, `Task with id ${taskId} not found`)
  }

  return new Response(JSON.stringify(task));
}
