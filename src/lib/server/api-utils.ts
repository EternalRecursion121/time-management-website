import { error } from '@sveltejs/kit';
import { auth } from 'google-auth-library';
import { v4 as uuid4} from 'uuid';

type Task = {
  id: string,
  title?: string;
  subtasks?: string[];
  metrics?: Record<string, any>;
  status?: string;
  priority?: number;
  tags?: string[];
  estimated_duration?: number;
  date_scheduled_for?: string;
  deadline?: string;
  date_completed?: string;
  description?: string;
  attachments?: string[];
}

type TaskData = {
  title?: string;
  subtasks?: string[];
  metrics?: Record<string, any>;
  status?: string;
  priority?: number;
  tags?: string[];
  estimated_duration?: number;
  date_scheduled_for?: string;
  deadline?: string;
  date_completed?: string;
  description?: string;
  attachments?: string[];
}

export function constructTask(taskData: TaskData) {
  const task: Task = {
    id: uuid4(),
    title: taskData.title || "Unnamed Task",
    subtasks: taskData.subtasks || [],
    metrics: taskData.metrics || {},
    tags: taskData.tags || [],
    attachments: taskData.attachments || []
  };

  if (taskData.status !== undefined) task.status = taskData.status;
  if (taskData.priority !== undefined) task.priority = taskData.priority;
  if (taskData.estimated_duration !== undefined) task.estimated_duration = taskData.estimated_duration;
  if (taskData.date_scheduled_for !== undefined) task.date_scheduled_for = taskData.date_scheduled_for;
  if (taskData.deadline !== undefined) task.deadline = taskData.deadline;
  if (taskData.date_completed !== undefined) task.date_completed = taskData.date_completed;
  if (taskData.description !== undefined) task.description = taskData.description;

  return task;
}

async function getTaskFileId(authorisation: string) {
      const searchURL = 'https://www.googleapis.com/drive/v3/files?' + new URLSearchParams({
                        spaces: 'appDataFolder',
                        q: "name = 'tasks.json' and appProperties has { key='version' and value='v1' }",
                        fields: 'files(id)',
                        pageSize: 1
                    });

    const data = await (await fetch(searchURL, {
        method: 'GET',
        headers: {
        'Authorization': authorisation
        },
    })).json();

    if (data?.error) {
        throw error(data.error.code, data.error.message)
    }

    if (data.files[0]) {
        const taskFileId = data.files[0].id;
        return taskFileId
    }

    return null
}

export async function retrieveTaskData(authorisation: string) {
    const taskFileId = await getTaskFileId(authorisation);
    if (taskFileId) {
        return await (await fetch(`https://www.googleapis.com/drive/v3/files/${taskFileId}?alt=media`, {
            headers: {
                'Authorization': authorisation
            }
        })).json();
    } else {
        const boundary = `=========${Math.random().toString(36).slice(2, 11)}===`;
        const metadata = {
            name: 'tasks.json',
            parents: ['appDataFolder'],
            appProperties: { version:'v1' }
        };
        // console.log(`--${boundary}\r\n` +
        //         `Content-Type: application/json; charset=UTF-8\r\n\r\n` +
        //         `${JSON.stringify(metadata)}\r\n` +
        //         `--${boundary}\r\n` +
        //         `Content-Type: application/json; charset=UTF-8\r\n\r\n` +
        //         `{"tasks": []}\r\n` +
        //         `--${boundary}--`);

        let response = await (await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
            method: 'POST',
            headers: {
                'Authorization': authorisation,
                'Content-Type': `multipart/related boundary="${boundary}"`
            },
            body: `--${boundary}\r\n` +
                    `Content-Type: application/json; charset=UTF-8\r\n\r\n` +
                    `${JSON.stringify(metadata)}\r\n` +
                    `--${boundary}\r\n` +
                    `Content-Type: application/json; charset=UTF-8\r\n\r\n` +
                    `[]\r\n` +
                    `--${boundary}--`
        })).json();

        if (response?.error) {
            throw error(response.error.code, response.error.message)
        }

        return []
    }
}

export async function uploadTaskData(authorisation: string, taskData: Array<TaskData>) {
    const taskFileId = await getTaskFileId(authorisation);
    return await fetch(`https://www.googleapis.com/upload/drive/v3/files/${taskFileId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': authorisation,
                'Content-Type': `application/json`
            },
            body: JSON.stringify(taskData)
        });
}