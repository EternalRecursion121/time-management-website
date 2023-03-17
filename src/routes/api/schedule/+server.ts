/** @type {import('@sveltejs/adapter-vercel').Config} */
export const config = {
  runtime: 'edge'
};

import { error } from '@sveltejs/kit';
import { retrieveTaskData } from '$lib/server/api-utils';

export const POST = async ({ request }) => {
  let authorisation: string = request.headers.get('Authorization');
  if (!authorisation) {
    throw error(401, 'No access token provided');
  }

  const { taskID, startDate, duration} = await request.json();

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

