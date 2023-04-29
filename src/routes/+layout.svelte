<script lang="ts">
  import "../app.css";
  import SideBarMenu from "$lib/SideBarMenu.svelte";

  import { initializeApp } from "firebase/app";

  const firebaseConfig = {
    apiKey: "AIzaSyAjTBdENK1YglNr_VBCPe_aD6jXb8OsuwY",
    authDomain: "personal-science-48652.firebaseapp.com",
    projectId: "personal-science-48652",
    storageBucket: "personal-science-48652.appspot.com",
    messagingSenderId: "911666724518",
    appId: "1:911666724518:web:ea43e0dbaca69621163e67",
    measurementId: "G-NSB8VPRXN2"
  };

  const app = initializeApp(firebaseConfig);

  let open = true;
</script>
<link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>



<div>
  <div class="bg-gradient-to-r from-[#8ea8d8] to-[#2d7e9e]">
    <SideBarMenu app={app} bind:open/>
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