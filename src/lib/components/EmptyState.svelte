<script lang="ts">
	interface Props {
		statusFilter: string;
		priorityFilter: string;
		onCreateNew: () => void;
	}

	let { statusFilter, priorityFilter, onCreateNew }: Props = $props();
</script>

<div class="card bg-base-100 shadow-lg">
	<div class="card-body items-center py-12 text-center">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-24 w-24 opacity-20"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
			/>
		</svg>
		<h3 class="mt-4 text-xl font-bold">No Reminders Found</h3>
		<p class="mt-2 opacity-70">
			{statusFilter !== 'all' || priorityFilter !== 'all'
				? 'Try adjusting your filters'
				: 'Create your first reminder to get started'}
		</p>
		{#if statusFilter === 'all' && priorityFilter === 'all'}
			<button class="btn btn-primary mt-4" onclick={onCreateNew}> Create Reminder </button>
		{/if}
	</div>
</div>
