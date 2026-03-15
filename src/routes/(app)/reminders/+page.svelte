<script lang="ts">
	import { remindersStore, reminderUIStore } from '$lib/stores/reminder.store';

	import SkeletonCard from '$lib/components/SkeletonCard.svelte';
	import EmptyState from '$lib/components/EmptyState.svelte';
	import ReminderFilter from '$lib/components/reminder/ReminderFilter.svelte';
	import ReminderStats from '$lib/components/reminder/ReminderStats.svelte';
	import ReminderCard from '$lib/components/reminder/ReminderCard.svelte';
	import ReminderModal from '$lib/components/reminder/ReminderModal.svelte';
	import ReminderDeleteModal from '$lib/components/reminder/ReminderDeleteModal.svelte';

	// Computed filtered reminders
	let filteredReminders = $derived.by(() => {
		if (!$remindersStore?.reminders) return [];

		let filtered = $remindersStore.reminders;

		// Filter by status
		if ($reminderUIStore.filters.status === 'active') {
			filtered = filtered.filter((r) => !r.is_completed);
		} else if ($reminderUIStore.filters.status === 'completed') {
			filtered = filtered.filter((r) => r.is_completed);
		}

		// Filter by priority
		if ($reminderUIStore.filters.priority !== 'all') {
			filtered = filtered.filter((r) => r.priority === $reminderUIStore.filters.priority);
		}

		// Sort
		filtered = [...filtered].sort((a, b) => {
			if ($reminderUIStore.filters.sortBy === 'date') {
				return new Date(a.date).getTime() - new Date(b.date).getTime();
			} else if ($reminderUIStore.filters.sortBy === 'priority') {
				const priorityOrder = { high: 0, medium: 1, low: 2 };
				return priorityOrder[a.priority] - priorityOrder[b.priority];
			} else {
				return a.title.localeCompare(b.title);
			}
		});

		return filtered;
	});
</script>

<svelte:head>
	<title>Reminders - Manage Your Tasks</title>
	<meta
		name="description"
		content="Manage your tasks and never miss important events with our reminder application."
	/>
</svelte:head>

<main class="space-y-6">
	<!-- Header -->
	<header class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<h1 class="text-3xl font-bold">Reminders</h1>
			<p class="mt-1 text-sm opacity-70">Manage your tasks and never miss important events</p>
		</div>
		<button
			class="btn btn-primary gap-2"
			onclick={() => reminderUIStore.openModal()}
			aria-label="Create new reminder"
			disabled={$remindersStore?.isLoading}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				class="h-5 w-5"
			>
				<line x1="12" y1="5" x2="12" y2="19"></line>
				<line x1="5" y1="12" x2="19" y2="12"></line>
			</svg>
			New Reminder
		</button>
	</header>

	<!-- Stats -->
	<ReminderStats
		total={$remindersStore?.total}
		active={$remindersStore?.active}
		completed={$remindersStore?.completed}
		upcoming={$remindersStore?.upcoming}
		isLoading={$remindersStore?.isLoading}
	/>

	<!-- Filters -->
	<ReminderFilter
		statusFilter={$reminderUIStore.filters.status}
		priorityFilter={$reminderUIStore.filters.priority}
		sortBy={$reminderUIStore.filters.sortBy}
		isLoading={$remindersStore?.isLoading}
		onStatusChange={(value) => reminderUIStore.updateFilter('status', value)}
		onPriorityChange={(value) => reminderUIStore.updateFilter('priority', value)}
		onSortChange={(value) => reminderUIStore.updateFilter('sortBy', value)}
	/>

	<!-- Reminders List -->
	<div class="space-y-4">
		{#if $remindersStore?.isLoading}
			<!-- Skeleton Cards -->
			{#each [1, 2, 3, 4, 5] as item (item)}
				<SkeletonCard />
			{/each}
		{:else if filteredReminders.length === 0}
			<!-- Empty State -->
			<EmptyState
				statusFilter={$reminderUIStore.filters.status}
				priorityFilter={$reminderUIStore.filters.priority}
				onCreateNew={() => reminderUIStore.openModal()}
			/>
		{:else}
			<!-- Reminder Cards -->
			{#each filteredReminders as reminder (reminder.id)}
				<ReminderCard
					{reminder}
					onEdit={(r) => reminderUIStore.openModal(r)}
					onDelete={(r) => reminderUIStore.openDeleteModal(r)}
					deletingId={$reminderUIStore.deletingId}
				/>
			{/each}
		{/if}

		<div class="join flex w-full items-center justify-center">
			<button class="join-item btn bg-slate-700">1</button>
			<button class="join-item btn bg-slate-700">2</button>
			<button class="join-item btn btn-disabled bg-slate-700">...</button>
			<button class="join-item btn bg-slate-700">99</button>
			<button class="join-item btn bg-slate-700">100</button>
		</div>
	</div>
</main>

<!-- Modals -->
<ReminderModal
	show={$reminderUIStore.showModal}
	editingId={$reminderUIStore.editingId}
	title={$reminderUIStore.form.title}
	description={$reminderUIStore.form.description}
	date={$reminderUIStore.form.date}
	time={$reminderUIStore.form.time}
	category={$reminderUIStore.form.category}
	priority={$reminderUIStore.form.priority}
	recurring={$reminderUIStore.form.recurring}
	onClose={() => reminderUIStore.closeModal()}
	onUpdateField={(
		field: 'date' | 'title' | 'description' | 'time' | 'category' | 'priority' | 'recurring',
		value
	) => reminderUIStore.updateForm(field, value)}
/>

<ReminderDeleteModal
	show={$reminderUIStore.showDeleteModal}
	reminder={$reminderUIStore.reminderToDelete}
	deletingId={$reminderUIStore.deletingId}
	onClose={() => reminderUIStore.closeDeleteModal()}
	onDeleteStart={() => reminderUIStore.setDeletingId($reminderUIStore.reminderToDelete?.id || null)}
	onDeleteEnd={() => reminderUIStore.setDeletingId(null)}
/>
