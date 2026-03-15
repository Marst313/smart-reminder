<script lang="ts">
	interface Props {
		total?: number;
		active?: number;
		completed?: number;
		upcoming?: number;
		isLoading?: boolean;
	}

	let { total = 0, active = 0, completed = 0, upcoming = 0, isLoading = false }: Props = $props();
</script>

<div class="grid grid-cols-1 gap-4 md:grid-cols-4">
	{#if isLoading}
		<!-- Skeleton Stats -->
		{#each [1, 2, 3, 4] as item (item)}
			<div class="stats shadow">
				<div class="stat p-4">
					<div class="skeleton mb-2 h-4 w-16"></div>
					<div class="skeleton h-8 w-12"></div>
				</div>
			</div>
		{/each}
	{:else}
		<div class="stats shadow">
			<div class="stat p-4">
				<div class="stat-title text-xs">Total</div>
				<div class="stat-value text-primary text-2xl">{total}</div>
			</div>
		</div>
		<div class="stats shadow">
			<div class="stat p-4">
				<div class="stat-title text-xs">Active</div>
				<div class="stat-value text-info text-2xl">{active}</div>
			</div>
		</div>
		<div class="stats shadow">
			<div class="stat p-4">
				<div class="stat-title text-xs">Completed</div>
				<div class="stat-value text-success text-2xl">{completed}</div>
			</div>
		</div>
		<div class="stats shadow">
			<div class="stat p-4">
				<div class="stat-title text-xs">Upcoming</div>
				<div class="stat-value text-warning text-2xl">{upcoming}</div>
			</div>
		</div>
	{/if}
</div>
