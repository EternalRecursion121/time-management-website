<script lang="ts">
    import { page } from '$app/stores';
    import { DateInput } from 'date-picker-svelte'

    export let open: boolean;
    export let getTasks: Function;

    let dueDate: Date | null = null;
    let title: string = "";
    let subtasks: Array<string> = [];
    let metrics: Object = {};
    let priority: number;
    let status: string;
    let tags: Array<string> = [];

    async function createTask() {
        let taskData = {};
        if (title) taskData.title = title;
        if (subtasks.length != 0) taskData.subtasks = subtasks;
        if (Object.keys(metrics).length != 0) taskData.metrics = metrics;
        if (status) taskData.status = status;
        if (tags.length != 0) taskData.tags = tags;
        if (dueDate) {
            dueDate.setDate(dueDate.getDate() + 1);
            dueDate.setHours(0, 0, 0, 0);
            taskData.deadline = dueDate; 
        }


        try {
          const response = await fetch("/api/tasks", {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${$page.data.token.access_token}`,
                    'content-type': 'application/json'
                },
                body: JSON.stringify(taskData)
            }).catch(console.error);

        } catch (error) {
            console.error(error);
        }  
        open = false;
        await getTasks()
    }
</script>

<div class="transition-opacity">
    <div class="absolute inset-0 bg-gray-500 opacity-50" />

    <div
        class="bg-white rounded-lg px-16 pt-5 pb-4 overflow-visible shadow-xl transform transition-all sm:max-w-lg sm:w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
    >
        <div>
            <!--Create x button in top right of modal to close modal-->
            <div class="absolute top-0 right-0 pt-4 pr-4">
                <button
                    on:click={() => (open = false)}
                    class="text-gray-400 hover:text-gray-500 transition ease-in-out duration-150">
                    <svg
                        class="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                        ></path>
                    </svg>
                </button>
            </div>
            <h3
                class="mt-5 text-lg leading-6 font-medium text-gray-900"
                id="modal-headline"
            >
                Create Task
            </h3>
            <div class="mt-2">
                <form>
                    <div class="mt-5 sm:mt-5">
                        <div class="mt-1 sm:mt-5">
                            <label
                                for="title"
                                class="block text-sm font-medium leading-5 text-gray-700"
                            >
                                Title
                            </label>
                            <div class="mt-1 rounded-md shadow-sm">
                                <input
                                    id="title"
                                    value={title}
                                    class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    on:input={(e) => (title = e.target.value)}
                                />
                            </div>
                        </div>
                        <div class="mt-5 sm:mt-5">
                            <label
                                for="subtasks"
                                class="block text-sm font-medium leading-5 text-gray-700"
                            >
                                Subtasks
                            </label>
                            <div class="mt-1 rounded-md shadow-sm">
                                <input
                                    id="subtasks"
                                    value={subtasks}
                                    class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    on:input={(e) =>
                                        (subtasks = e.target.value.split(","))}
                                />
                            </div>
                        </div>

                        <div class="mt-5 sm:mt-5">
                            <label
                                for="metrics"
                                class="block text-sm font-medium leading-5 text-gray-700"
                            >
                                Metrics
                            </label>
                            <div class="mt-1 rounded-md shadow-sm">
                                <input
                                    id="metrics"
                                    value={JSON.stringify(metrics)}
                                    class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    on:input={(e) =>
                                        (metrics = JSON.parse(e.target.value))}
                                />
                            </div>
                        </div>
                        <div class="mt-5 sm:mt-5">
                            <label
                                for="status"
                                class="block text-sm font-medium leading-5 text-gray-700"
                            >
                                Status
                            </label>
                            <div class="mt-1 rounded-md shadow-sm">
                                <input
                                    id="status"
                                    value={status || ""}
                                    class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    on:input={(e) => (status = e.target.value)}
                                />
                            </div>
                        </div>
                        <div class="mt-5 sm:mt-5">
                            <label
                                for="priority"
                                class="block text-sm font-medium leading-5 text-gray-700"
                            >
                                Priority
                            </label>
                            <div class="mt-1 rounded-md shadow-sm">
                                <input
                                    id="priority"
                                    value={priority}
                                    type="number"
                                    class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    on:input={(e) =>
                                        (priority = Number(e.target.value))}
                                />
                            </div>
                        </div>

                        <div class="mt-5">
                            <label
                                for="tags"
                                class="block text-sm font-medium leading-5 text-gray-700"
                            >
                                Tags
                            </label>
                            <div class="mt-1 rounded-md shadow-sm">
                                <input
                                    id="tags"
                                    value={tags}
                                    class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    on:input={(e) =>
                                        (tags = e.target.value.split(","))}
                                />
                            </div>
                        </div>
                        
                        <div class="mt-5">
                            <label
                                for="Due Date"
                                class="block text-sm font-medium leading-5 text-gray-700"
                            >
                                Due Date
                            </label>
                            <div class="flex">
                                <div class="mr-4">
                                    <DateInput format="yyyy-MM-dd" bind:value={dueDate} />
                                </div>
                                <button on:click={()=>{dueDate=null}} class="bg-slate-800 rounded p-1 hover:bg-slate-700 text-slate-200">
                                Remove date
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="mt-5 sm:mt-6">
                        <span class="flex w-full rounded-md shadow-sm">
                            <button
                                type="button"
                                class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-slate-800 text-base leading-6 font-medium text-white shadow-sm hover:bg-slate-700 focus:outline-none focus:border-slate-700 focus:shadow-outline-slate transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                                on:click={createTask}
                            >
                                Create Task
                            </button>
                        </span>
                    </div>
            </div>
        </div>
    </div>
</div>
