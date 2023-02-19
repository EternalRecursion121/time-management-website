/** @type {import('@sveltejs/adapter-vercel').Config} */
export const config = {
  runtime: 'edge'
};

import { error } from '@sveltejs/kit';
import { constructTask, retrieveTaskData, uploadTaskData} from '$lib/server/api-utils';

export const GET = async ({ request }) => {

  let authorisation = request.headers.get('Authorization');
  if (!authorisation) {
    throw error(401, 'No access token provided');
  }

  const taskData = await retrieveTaskData(authorisation);

  return new Response(JSON.stringify(taskData));
}

export const POST = async ({ request }) => {
  let authorisation: string = request.headers.get('Authorization');
  if (!authorisation) {
    throw error(401, 'No access token provided');
  }

  const taskData = await request.json();
  const task = constructTask(taskData);

  let taskList: Array<Object> = await retrieveTaskData(authorisation);
  taskList.push(task);
  
  const response = await uploadTaskData(authorisation, taskList);
  if (response.status !== 200) {
    return response;
  }

  // if (task.dateScheduled && task.estimatedDuration) {
  //   fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events',
  //     {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': authorisation
  //       },
  //       body: JSON.stringify({
  //         summary: `task.title`,
  //         description: `task.description`,
  //         start: {
  //           dateTime: task.dateScheduled,
               
  //     });
  // };


}