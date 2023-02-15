<script lang="ts">
  import { page } from "$app/stores";

  export let task: Object;

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  function closeModal() {
    dispatch("close");
  }

  function formatDate(dateString: string | undefined) {
    if (dateString == undefined) return "";

    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  }

function handleEdit () {
  dispatch("edit", task);
}

function handleDelete () {
  fetch(`/api/tasks/${task.id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${$page.data.token.access_token}`,
    },
  })
    .then((response) => {
      if (response.status == 401) {
        signIn("google");
      }
      if (response.status == 200) {
        dispatch("close");
        dispatch("delete");
      }
    })
    .catch(console.error)
}

</script>

<div class="fixed z-10 inset-0 overflow-y-auto">
  <div
    class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
  >
    <div class="fixed inset-0 transition-opacity">
      <div class="absolute inset-0 bg-gray-500 opacity-75" />
    </div>

    <span class="hidden sm:inline-block sm:align-middle sm:h-screen" />&#8203;

    <div
      class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
    >
      <button class="absolute top-0 right-0 p-2" on:click={() => dispatch("close")}>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div class="sm:flex sm:items-start">
          <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
              {task.title}
            </h3>
            <div class="mt-2">
              {#if task.description}
                <p class="text-sm text-gray-500 mb-2">{task.description}</p>
              {/if}
              <div class="grid grid-cols-2 gap-4 mb-4">
                {#if task.date_scheduled_for}
                  <div class="text-gray-500 font-medium">Scheduled for:</div>
                  <div class="text-gray-800">
                    {formatDate(task.date_scheduled_for)}
                  </div>
                {/if}
                {#if task.deadline}
                  <div class="text-gray-500 font-medium">Deadline:</div>
                  <div class="text-gray-800">{formatDate(task.deadline)}</div>
                {/if}
                {#if task.date_completed}
                  <div class="text-gray-500 font-medium">Completed on:</div>
                  <div class="text-gray-800">
                    {formatDate(task.date_completed)}
                  </div>
                {/if}
                {#if task.priority}
                  <div class="text-gray-500 font-medium">Priority:</div>
                  <div class="text-gray-800">{task.priority}</div>
                {/if}
                {#if task.status}
                  <div class="text-gray-500 font-medium">Status:</div>
                  <div class="text-gray-800">{task.status}</div>
                {/if}
                {#if task.estimated_duration}
                  <div class="text-gray-500 font-medium">
                    Estimated duration:
                  </div>
                  <div class="text-gray-800">
                    {task.estimated_duration} minutes
                  </div>
                {/if}
                {#if task.subtasks.length>0}
                  <div class="text-gray-500 font-medium">Subtasks:</div>
                  <div class="text-gray-800">
                    <ul>
                      {#each task.subtasks as subtask}
                        <li>{subtask}</li>
                      {/each}
                    </ul>
                  </div>
                {/if}
                <!-- {#if task.attachments}
                    <div class="text -->
              </div>
              <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400" on:click={handleEdit}>
                Edit Task
              </button>
              <button class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-400" on:click={handleDelete}>
                Delete Task
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
