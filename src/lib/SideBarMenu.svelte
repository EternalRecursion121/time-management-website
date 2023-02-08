<script lang="ts">
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';


  export let open = true;
	function menu_btn_click() {
		let sidebar = document.querySelector(".sidebar")!;
		let toggleBtn = document.querySelector("#btn")!;
		sidebar.classList.toggle("open");
		if(sidebar.classList.contains("open")) {
			toggleBtn.classList.replace("bx-menu", "bx-menu-alt-right");
      open = true;
		} else {
			toggleBtn.classList.replace("bx-menu-alt-right","bx-menu");
      open = false;
		}
	}
</script>

<div class="sidebar" class:open>
	<div class="logo-content">
		<i class='bx bx-menu' id="btn" on:click={menu_btn_click}></i>
	</div>
	<ul class="nav-list">
    <li>
      <a href="#">
        <i class="bx bx-time-five"></i>
        <span class="links_name">Day</span>
      </a>
    </li>
    <li>
      <a href="#">
        <i class="bx bx-calendar-week"></i>
        <span class="links_name">Week</span>
      </a>
    </li>
		<li>
			<a href="#">
				<i class='bx bx-task' ></i>
				<span class="links_name">Tasks</span>
			</a>
		</li>
		<li>
			<a href="#">
				<i class='bx bx-calendar-alt' ></i>
				<span class="links_name">Calendar</span>
			</a>
		</li>
		<li>
			<a href="#">
				<i class='bx bx-cog'></i>
				<span class="links_name">Settings</span>
			</a>
		</li>
    <li class="profile">
      
      {#if $page.data.session}
         <div class="profile-details">
            {#if $page.data.session.user?.image}
              <img src="{$page.data.session.user.image}">
            {:else}
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLeqsbTn6eqpr7PJzc/j5ebf4eLZ3N2wtrnBxsjN0NLGysy6v8HT1tissra8wMNxTKO9AAAFDklEQVR4nO2d3XqDIAxAlfivoO//tEOZWzvbVTEpic252W3PF0gAIcsyRVEURVEURVEURVEURVEURVEURVEURVEURVEURflgAFL/AirAqzXO9R7XNBVcy9TbuMHmxjN6lr92cNVVLKEurVfK/zCORVvW8iUBnC02dj+Wpu0z0Y6QlaN5phcwZqjkOkK5HZyPAjkIjSO4fIdfcOwFKkJlX4zPu7Ha1tIcwR3wWxyFhRG6g4Je0YpSPDJCV8a2Sv2zd1O1x/2WMDZCwljH+clRrHfWCLGK8REMiql//2si5+DKWKcWeAGcFMzzNrXC/0TUwQ2s6+LhlcwjTMlYsUIQzPOCb7YBiyHopyLXIEKPEkI/TgeuiidK/R9FniUDOjRDpvm0RhqjMyyXNjDhCfIMYl1gGjIMIuYsnGEYRMRZOMMunaLVwpWRW008v6fYKDIzxCwVAeNSO90BJW6emelYBRF/kHpYGVaoxTDAaxOFsfP9y8hpJ4xd7gOcij7JNGQ1EYFgkPJa1jQEiYZXRaRINKxSDUW9n+FT82lSKadkiru9/4XPqSLWOekGPoY05TAvLm9orm+YWuwHoBHkZKijNBJGmeb61eL6Ff/6q7bLr7yvv3vKGhpDRjvgjGaPz+gUg6YgcvpyAR2FIZ9U6nEEyZRTovmEU32KichpGn7C17XrfyH9gK/c0CMP05HZIM2uf9sEveizKveBy9/6Qt7o89ne33D525cfcIMW6ab+TMEukQbQbu+xu7X3A9bChmWaCeAkG17bpntwXgWxHaMzGPmUaR5dQZiKqRVeUZ3047fi3nAu28h4CHxCsZAgmEH8Y27jJAhm8c+5RQzRQNVGhVFSfxOYIjp/pP7RxzjevYXVGf4eLt+BJ1vCuLuLkrgABgCGXZ2wik5uty+oBvNirI6mkzhAf4Gsb58Hcm67Jzd+KwD10BYPLL3e0MjvKrgAULnOfveF/O4N2Xb9BZom3gJes3F9X5Zze8/6Yt09b4CrqsEjUv8oFBaR2rl+6CZr2xVrp24o/WitBKuGrrpl1+bFkmK2qXTON4VpbdfLa7o7y/WdLxG7lm2Lqh2clOwTegbvc/vj2U78CwhA87Bn8G5Nk3eOb0Nsr9flz3sG78UUtue4kpv1xvjg3TMay62BMlTlP+vrOMnJsRmt/ze0jsfkPPYdAH57hK+34PeOyc8XIXu5xT2HsUkdZz+adwg8HGFfQ3K5jtDvbUiO4Di9/ywHGrL88pDizZ++oTp+an+SMX/ndymUCwmHMdO7yuOx83pUx/eEMU0AvxWndwgidAqOZ8ypCwdEfvvEo6D9HwpA8wzvmOJEqAg9ySu8g4x0Hb9hSB/BANEKJ+LbPBU0lzbAJs4xt1AoshKkUGQmiH8/jJ0gdhTTLmSegHlPE0oOdXALnqDjKYh3px//fSgSWG8UqfrrIICzYYSJXRr9BSPbpNzw7gBjKjKOYI7ReIGqQRIap5+5MdjyvuDkExvGeXSlONWZAP3/AZBwJohU7QJRGU+cTVH18ELmRPNBmibW6MT/k1b0XhdkRBvyT6SB6EYv/GvhSmRNpGngRULsAlxMCGNXp7w3FfdEbTEEDdLI9TdIKRUzUesa3I461ER8cpNT7gMRhpKmYVS9ELOgCUQsa4SsulciKiLbY+AnHD8cpuhISsnxpamI84sbDq9qYJgf8wiiOBrC7Ml7M7ZECCqKoiiKoiiKoiiKoijv5AvJxlZRyNWWLwAAAABJRU5ErkJggg==" alt="profileImg">
            {/if}
            {#if $page.data.session.user?.name}
              <div class="name">{$page.data.session.user.name ?? "User"}</div>
            {/if}
         </div>
         <i  on:click={() => signOut()} class='bx bx-log-out' id="log_out"></i>
      {:else}
        {console.log($page.data)}
        <button on:click={() => signIn('google')} class="name hover:bg-blue-800">Log in</button>
      {/if}
     </li>
	</ul>
</div>


<style>
	 /* Google Font Link */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins" , sans-serif;
}
.sidebar{
  @apply bg-black bg-opacity-30;
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 78px;
  padding: 6px 14px;
  z-index: 99;
  transition: all 0.5s ease;
}
.sidebar .logo-content{
  height: 60px;
  display: flex;
  align-items: center;
  position: relative;
}
.sidebar .logo-content #btn{
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  font-size: 22px;
  transition: all 0.4s ease;
  font-size: 23px;
  text-align: center;
  cursor: pointer;
  transition: all 0.5s ease;
}

.sidebar.open{
  width: 215px;
}
.sidebar i{
  color: #E4E9F7;
  height: 60px;
  min-width: 50px;
  font-size: 28px;
  text-align: center;
  line-height: 60px;
}

.sidebar .nav-list{
  margin-top: 20px;
  height: 100%;
}
.sidebar li{
  position: relative;
  margin: 8px 0;
  list-style: none;
}

.sidebar li a{
  display: flex;
  height: 100%;
  width: 100%;
  border-radius: 12px;
  align-items: center;
  text-decoration: none;
  transition: all 0.4s ease;
}
.sidebar li a:hover{
  @apply bg-[#E4E9F7] bg-opacity-90;
}
.sidebar li a .links_name{
  color: #E4E9F7;
  font-size: 15px;
  font-weight: 400;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: 0.4s;
}
.sidebar.open li a .links_name{
  opacity: 1;
  pointer-events: auto;
}
.sidebar li a:hover .links_name,
.sidebar li a:hover i{
  transition: all 0.5s ease;
  color: #11101D;
}
.sidebar li i{
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  border-radius: 12px;
}

.sidebar li.profile{
  position: fixed;
  height: 60px;
  width: 78px;
  left: 0;
  bottom: -8px;
  padding: 10px 14px;
  transition: all 0.5s ease;
  overflow: hidden;
}
.sidebar.open li.profile{
  width: 215px;
  @apply bg-slate-900 bg-opacity-[0.05];
}
.sidebar li .profile-details{
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: all 0.5s ease;
}

.sidebar.open li .profile-details {
  opacity:1;
  align-items: center;
  pointer-events: auto;
  white-space: nowrap;
  transition: all 0.5s ease;
}

.sidebar li img{
  height: 45px;
  width: 45px;
  object-fit: cover;
  border-radius: 6px;
  margin-right: 10px;
}
.sidebar li.profile .name{
  font-size: 15px;
  font-weight: 400;
  color: #E4E9F7;
  white-space: nowrap;
}

.sidebar .profile-details img{
  height: 45px;
  width: 45px;
  object-fit: cover;
  border-radius: 12px;
}

.sidebar .profile #log_out{
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  width: 100%;
  height: 60px;
  line-height: 60px;
  border-radius: 0px;
  transition: all 0.5s ease;
}

.sidebar .profile #log_out:hover{
  color: #a5b0c9;
}

.sidebar.open .profile #log_out{
  width: 50px;
  background: none;
}


</style>