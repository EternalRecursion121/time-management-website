<script lang="ts">
  export let task: Object;

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  function closeModal() {
    dispatch('close');
  }
</script>

<div class="fixed z-10 inset-0 overflow-y-auto">
  <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
    <div class="fixed inset-0 transition-opacity" aria-hidden="true" on:click={closeModal}>
      <div class="absolute inset-0 bg-gray-500 opacity-50"></div>
    </div>
    <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
      <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <h3 class="text-lg leading-6 font-medium text-gray-900">{task.title}</h3>
        <div class="mt-4">
          <p class="text-sm text-gray-500">{task.description}</p>
        </div>
        <div class="mt-4">
          <p><span class="font-bold text-gray-700">Status: </span>{task.status}</p>
          <p><span class="font-bold text-gray-700">Priority: </span>{task.priority}</p>
          <p><span class="font-bold text-gray-700">Deadline: </span>{task.deadline}</p>
        </div>
      </div>
      <div class="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm" on:click={closeModal}>
          Close
        </button>
      </div>
    </div>
  </div>
</div>
