<script lang="ts">
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import AddTaskModal from "$lib/addTaskModal.svelte";

    // console.log($page.data);
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
                tasks = await response.json().catch(console.error);
                console.log(tasks);
            }
        } catch (error) {
            console.error(error);
        }
    }

    onMount(async () => {
        await getTasks();
    });

    let showModal = false;

    // console.log(decode({token: $page.data.session.token}))
</script>

<div>
    <button
        on:click={getTasks}
        class="mt-4 bg-slate-800 rounded p-1 hover:bg-slate-700 text-slate-200"
        >Refresh</button
    >
    <div class="mt-2">
        {#if tasks}
            {#each tasks as task}
                <div class="bg-white p-4 rounded-lg shadow-md mb-4">
                    <h1 class="text-2xl font-bold mb-2">{task.title}</h1>
                    <p class="text-gray-700 leading-relaxed mb-4">
                        {task.description}
                    </p>
                    <div class="flex items-center mb-2">
                        <span class="w-1/3 font-bold text-gray-700">
                            Status:
                        </span>
                        <span class="w-2/3 text-gray-700">{task.status}</span>
                    </div>
                    <div class="flex items-center mb-2">
                        <span class="w-1/3 font-bold text-gray-700">
                            Priority:
                        </span>
                        <span class="w-2/3 text-gray-700">{task.priority}</span>
                    </div>
                    <div class="flex items-center">
                        <span class="w-1/3 font-bold text-gray-700"
                            >Deadline:
                        </span>
                        <span class="w-2/3 text-gray-700">{task.deadline}</span>
                    </div>
                </div>
            {/each}
        {:else}
            <h1>Loading...</h1>
        {/if}
    </div>
    <button
        class="mt-4 bg-slate-800 rounded p-1 hover:bg-slate-700 text-slate-200"
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
