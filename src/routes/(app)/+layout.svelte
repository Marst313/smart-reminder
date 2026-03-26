<script>
	import RightIndicator from '$lib/components/RightIndicator.svelte';
	import { resolve } from '$app/paths';
	import { remindersStore, reminderUIStore } from '$lib/stores/reminder.store.js';
	import { page } from '$app/state';

	const { data, children } = $props();

	$effect(() => {
		const perPage = Number(page.url.searchParams.get('limit') || 10);
		const currentPage = Number(page.url.searchParams.get('page') || 1);

		remindersStore.setReminders(data);
		reminderUIStore.setPagination(data.total, perPage, currentPage);
	});
</script>

<div class="drawer lg:drawer-open">
	<input id="my-drawer-4" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content">
		<!-- RightIndicator -->
		<nav class="navbar bg-base-300 w-full justify-between">
			<label for="my-drawer-4" aria-label="open sidebar" class="btn btn-square btn-ghost">
				<!-- Sidebar toggle icon -->
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					stroke-linejoin="round"
					stroke-linecap="round"
					stroke-width="2"
					fill="none"
					stroke="currentColor"
					class="my-1.5 inline-block size-4"
					><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"
					></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg
				>
			</label>

			<RightIndicator />
		</nav>

		<div class="p-4">
			{@render children?.()}
		</div>
	</div>

	<div class="drawer-side is-drawer-close:overflow-visible">
		<label for="my-drawer-4" aria-label="close sidebar" class="drawer-overlay"></label>
		<div
			class="bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64 flex min-h-full flex-col items-start"
		>
			<!-- Sidebar content here -->
			<ul class="menu w-full grow">
				<!-- List item -->
				<li>
					<a
						href={resolve('/dashboard')}
						class="is-drawer-close:tooltip is-drawer-close:tooltip-right"
						data-tip="Dashboard"
					>
						<!-- Home icon -->
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							stroke-linejoin="round"
							stroke-linecap="round"
							stroke-width="2"
							fill="none"
							stroke="currentColor"
							class="my-1.5 inline-block size-4"
							><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path
								d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
							></path></svg
						>
						<span class="is-drawer-close:hidden">Dashboard</span>
					</a>
				</li>

				<!-- List item -->
				<li>
					<a
						href={resolve('/reminders')}
						class="is-drawer-close:tooltip is-drawer-close:tooltip-right"
						data-tip="Reminders"
					>
						<!-- Reminders icon -->

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
							class="lucide lucide-list-checks-icon lucide-list-checks my-1.5 inline-block size-4"
							><path d="M13 5h8" /><path d="M13 12h8" /><path d="M13 19h8" /><path
								d="m3 17 2 2 4-4"
							/><path d="m3 7 2 2 4-4" /></svg
						>

						<span class="is-drawer-close:hidden">Reminders</span>
					</a>
				</li>
			</ul>
		</div>
	</div>
</div>
