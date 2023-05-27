<script lang="ts">
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { signIn } from "@auth/sveltekit/client";

    import AddTaskModal from "$lib/AddTaskModal.svelte";
    import TaskModal from "$lib/TaskModal.svelte";

    let tasks: Array<Object>;
    async function getTasks() {
        try {
            const response = await fetch("/api/tasks", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${$page.data.token.access_token}`,
                },
            }).catch(console.error);

            if (response) {
                if (response.status == 401) {
                    signIn('google');
                }

                tasks = await response.json().catch(console.error);
                // console.log(tasks);
            }
        } catch (error) {
            console.error(error);
        }
    }

    onMount(async () => {
        await getTasks();
        let taskDisplayConfig = window.localStorage.getItem('taskDisplayConfig') ?? {
            fields: ["title", "description", "priority", "deadline"]
        };
    });


    function formatDate(dateString: string | undefined) {
        if (dateString == undefined) return "";
 
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        });
    }

    let showModal = false;
    let selectedTask = null;

    function closeModal() {
        selectedTask = null;
    }

    // console.log(decode({token: $page.data.session.token}))
</script>

<div class="pt-16 mr-5">
    <div>
        <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
            <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deadline</th>
            <th>
                <button on:click={getTasks} class="rounded p-1 text-slate-200">
                    <i class='bx bx-refresh text-gray-500'></i>
                </button>
            </th>
            </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
            {#if (tasks)}
                {#each tasks as task}
                <tr class="hover:bg-gray-50 cursor-pointer" on:click={() => {selectedTask=task}}>
                    <td class="px-6 py-4 whitespace-nowrap">{task.title || ""}</td>
                    <td class="px-6 py-4 whitespace-nowrap">{task.status || ""}</td>
                    <td class="px-6 py-4 whitespace-nowrap">{task.priority || ""}</td>
                    <td class="px-6 py-4 whitespace-nowrap">{formatDate(task.deadline)}</td>
                    <td></td>
                </tr>
                {/each}
            {:else}
                <div>Loading...</div>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            {/if}
        </tbody>
        </table>

        {#if (selectedTask)}
            <TaskModal task={selectedTask} on:close={closeModal} on:delete={getTasks}/>
        {/if}
    </div>
    <button
        class="mt-4 bg-slate-800 rounded p-1 hover:bg-slate-700 text-slate-200 w-full"
        on:click={() => {
            showModal = true;
        }}>Add Task</button
    >

    <!-- Modal -->
    {#if showModal}
        <div
            class="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center"
        >
            <AddTaskModal bind:open={showModal} {getTasks} />
        </div>
    {/if}
</div>
