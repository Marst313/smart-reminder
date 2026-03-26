<script lang="ts">
	import { enhance } from '$app/forms';
	import type { TReminder } from '$lib/stores/reminder.store';

	interface Props {
		reminder: TReminder;
		onEdit: (reminder: TReminder) => void;
		onDelete: (reminder: TReminder) => void;
		deletingId?: number | null;
	}

	let { reminder, onEdit, onDelete, deletingId = null }: Props = $props();

	let isToggling = $state(false);

	function getPriorityColor(priority: string) {
		switch (priority) {
			case 'high':
				return 'badge-error';
			case 'medium':
				return 'badge-warning';
			case 'low':
				return 'badge-success';
			default:
				return 'badge-ghost';
		}
	}

	function getCategoryIcon(category: string) {
		switch (category) {
			case 'personal':
				return '👤';
			case 'work':
				return '💼';
			case 'health':
				return '💪';
			case 'shopping':
				return '🛒';
			default:
				return '📌';
		}
	}

	function formatDate(dateStr: string) {
		return new Date(dateStr).toLocaleDateString('id-ID', {
			day: 'numeric',
			month: 'short',
			year: 'numeric'
		});
	}

	function formatTime(timeStr: string) {
		return timeStr.split('T')[1]?.substring(0, 5) || timeStr;
	}
</script>

<div class="card bg-base-100 shadow-lg transition-shadow hover:shadow-xl">
	<div class="card-body p-4">
		<div class="flex items-start gap-4">
			<!-- Toggle Complete Form -->
			<form
				method="POST"
				action="?/toggleComplete"
				use:enhance={() => {
					return async ({ update }) => {
						await update({
							reset: false
						});
					};
				}}
			>
				<input type="hidden" name="id" value={reminder.id} />
				<input type="hidden" name="is_completed" value={reminder.is_completed} />
				<button
					type="submit"
					class="mt-1 cursor-pointer"
					disabled={isToggling}
					aria-label="Toggle reminder completion"
				>
					{#if isToggling}
						<span class="loading loading-spinner loading-sm"></span>
					{:else}
						<input
							type="checkbox"
							class="checkbox checkbox-lg pointer-events-none"
							checked={reminder.is_completed}
							readonly
						/>
					{/if}
				</button>
			</form>

			<!-- Content -->
			<div class="min-w-0 flex-1">
				<h3 class="text-lg font-bold {reminder.is_completed ? 'line-through opacity-60' : ''}">
					{reminder.title}
				</h3>

				{#if reminder.description}
					<p class="mt-1 text-sm opacity-70 {reminder.is_completed ? 'line-through' : ''}">
						{reminder.description}
					</p>
				{/if}

				<!-- Meta Info -->
				<div class="mt-3 flex flex-wrap gap-2">
					<span class="badge badge-outline gap-1">
						<span>{getCategoryIcon(reminder.category)}</span>
						<span class="capitalize">{reminder.category}</span>
					</span>

					<span class="badge {getPriorityColor(reminder.priority)} gap-1">
						<span class="capitalize">{reminder.priority}</span>
					</span>

					<span class="badge badge-ghost gap-1">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-3 w-3"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
							/>
						</svg>
						{formatDate(reminder.date)} • {formatTime(reminder.time)}
					</span>

					{#if reminder.recurring}
						<span class="badge badge-info gap-1">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-3 w-3"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
								/>
							</svg>
							Recurring
						</span>
					{/if}
				</div>
			</div>

			<!-- Actions -->
			<div class="flex gap-2">
				<form method="POST" action="?/create">
					<input type="hidden" name="title" value={reminder.title} />
					<input type="hidden" name="description" value={reminder.description} />
					<input type="hidden" name="date" value={reminder.date.split('T')[0]} />
					<input type="hidden" name="time" value={reminder.time.slice(11, 16)} />
					<input type="hidden" name="category" value={reminder.category} />
					<input type="hidden" name="priority" value={reminder.priority} />
					<input type="hidden" name="recurring" value={reminder.recurring ? 'on' : ''} />

					<button class="btn btn-ghost btn-sm" type="submit" aria-label="Edit reminder">
						<svg
							class="h-5 w-5"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							><g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"
								><path
									d="M0 2a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v1.5a1 1 0 1 1-2 0V2H2v14h1.5a1 1 0 1 1 0 2H2a2 2 0 0 1-2-2z"
								/><path
									d="M8 6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2z"
								/></g
							></svg
						>
					</button>
				</form>
				<button
					class="btn btn-ghost btn-sm"
					onclick={() => onEdit(reminder)}
					aria-label="Edit reminder"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
						/>
					</svg>
				</button>

				<button
					type="button"
					class="btn btn-ghost btn-sm text-error"
					onclick={() => onDelete(reminder)}
					aria-label="Delete reminder"
					disabled={deletingId === reminder.id}
				>
					{#if deletingId === reminder.id}
						<span class="loading loading-spinner loading-sm"></span>
					{:else}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
							/>
						</svg>
					{/if}
				</button>
			</div>
		</div>
	</div>
</div>
