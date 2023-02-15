<script lang="ts">
  import "../app.css";
  import SideBarMenu from "$lib/SideBarMenu.svelte";
  import { page } from '$app/stores';
  import { signIn } from '@auth/sveltekit/client';
  import { onMount } from 'svelte';

  onMount(() => {
    if ($page.data?.session?.error == "RefreshAccessTokenError") {
      signIn('google');
    }
  });

  let open = true;
</script>
<link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>



<div>
  <div class="bg-gradient-to-r from-[#8ea8d8] to-[#2d7e9e] w-screen h-screen">
    <SideBarMenu bind:open/>
    <div class="main-section" class:sidebar-open={open}>
      <slot />
    </div>
  </div> 
</div>

<style>
  .main-section{
    position: relative;
    min-height: 100vh;
    top: 0;
    left: 78px;
    width: calc(100% - 78px);
    transition: all 0.5s ease;
    z-index: 2;
  }
  .main-section.sidebar-open{
    left: 250px;
    width: calc(100% - 250px);
  }
</style>