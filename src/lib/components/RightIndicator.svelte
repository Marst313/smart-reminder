<script>
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { auth } from '$lib/stores/auth.store';
	import { remindersStore } from '$lib/stores/reminder.store';

	const logout = async () => {
		await fetch('/logout', {
			method: 'POST'
		});

		auth.logout();
		goto(resolve('/login'));
	};
</script>

<div class="flex items-center justify-end px-5 shadow-sm">
	<div class=" flex-none">
		<div role="button" class="btn btn-ghost btn-circle">
			<a href={resolve('/notifications')} class="indicator">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-bell-icon lucide-bell"
					><path d="M10.268 21a2 2 0 0 0 3.464 0" /><path
						d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"
					/></svg
				>
				<span class="badge badge-sm indicator-item btn-circle bg-">{$remindersStore.total} </span>
			</a>
		</div>

		<div class="dropdown dropdown-end">
			<div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
				<div class="w-10 rounded-full">
					<img
						alt="Tailwind CSS Navbar component"
						src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
					/>
				</div>
			</div>
			<ul
				tabindex="-1"
				class="menu menu-sm dropdown-content rounded-box bg-base-300 z-1 mt-5 w-52 p-2 shadow"
			>
				<li>
					<a href={resolve('/profile')} class="justify-between text-base">
						<span> Profile </span>

						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="lucide lucide-settings-icon lucide-settings"
							><path
								d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"
							/><circle cx="12" cy="12" r="3" /></svg
						>
					</a>
				</li>
				<li>
					<button on:click={logout} class="justify-between">
						<span class="text-base"> Logout </span>

						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="lucide lucide-log-out-icon lucide-log-out"
							><path d="m16 17 5-5-5-5" /><path d="M21 12H9" /><path
								d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
							/></svg
						>
					</button>
				</li>
			</ul>
		</div>
	</div>
</div>
