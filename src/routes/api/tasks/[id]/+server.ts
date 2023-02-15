/** @type {import('@sveltejs/adapter-vercel').Config} */
export const config = {
  runtime: 'edge'
};

import { error } from '@sveltejs/kit';
import { retrieveTaskData, uploadTaskData } from '$lib/server/api-utils';

export const GET = async ({ params, request }) => {
  let authorisation = request.headers.get('Authorization');
  if (!authorisation) {
    throw error(401, 'No access token provided');
  }

  const taskId = params.id;

  const taskData: Array<Object> = await retrieveTaskData(authorisation);
  const task = taskData.find(task => task.id === taskId)

  if (!task) {
    throw error(404, `Task with id ${taskId} not found`)
  }

  return new Response(JSON.stringify(task));
}

export const PUT = async ({ params, request }) => {
  let authorisation = request.headers.get('Authorization');
  if (!authorisation) {
    throw error(401, 'No access token provided');
  }

  const taskId = params.id;

  const taskData: Array<Object> = await retrieveTaskData(authorisation);
  const task = taskData.find(task => task.id === taskId)

  if (!task) {
    throw error(404, `Task with id ${taskId} not found`)
  }

  const updatedTask = await request.json();

  const updatedTaskData = taskData.map(task => {
    if (task.id === taskId) {
      return {id: task.id, ...updatedTask}
    } else {
      return task
    }
  })

  const response = await uploadTaskData(authorisation, updatedTaskData);

  return response;
}

export const PATCH = async ({ params, request }) => {
  let authorisation = request.headers.get('Authorization');
  if (!authorisation) {
    throw error(401, 'No access token provided');
  }

  const taskId = params.id;

  const taskData: Array<Object> = await retrieveTaskData(authorisation);
  const task = taskData.find(task => task.id === taskId)

  if (!task) {
    throw error(404, `Task with id ${taskId} not found`)
  }

  const updatedTask = await request.json();

  const updatedTaskData = taskData.map(task => {
    if (task.id === taskId) {
      return {...task, ...updatedTask}
    } else {
      return task
    }
  });
}

export const DELETE = async ({ params, request }) => {
  let authorisation = request.headers.get('Authorization');
  if (!authorisation) {
    throw error(401, 'No access token provided');
  }

  const taskId = params.id;

  const taskData: Array<Object> = await retrieveTaskData(authorisation);
  const task = taskData.find(task => task.id === taskId)

  if (!task) {
    throw error(404, `Task with id ${taskId} not found`)
  }

  const updatedTaskData = taskData.filter(task => task.id !== taskId)

  const response = await uploadTaskData(authorisation, updatedTaskData);

  return response;
}