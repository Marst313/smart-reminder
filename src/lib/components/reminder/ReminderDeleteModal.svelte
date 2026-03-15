<script lang="ts">
	import { enhance } from '$app/forms';
	import type { TReminder } from '$lib/stores/reminder.store';

	interface Props {
		show: boolean;
		reminder: TReminder | null;
		deletingId: number | null;
		onClose: () => void;
		onDeleteStart: () => void;
		onDeleteEnd: () => void;
	}

	let { show, reminder, deletingId, onClose, onDeleteStart, onDeleteEnd }: Props = $props();

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
</script>

{#if show && reminder}
	<div
		class="modal modal-open"
		role="dialog"
		aria-labelledby="delete-modal-title"
		aria-modal="true"
	>
		<div class="modal-box">
			<h3 id="delete-modal-title" class="text-lg font-bold">Konfirmasi Hapus</h3>
			<div class="py-4">
				<p class="mb-2">Apakah Anda yakin ingin menghapus reminder ini?</p>
				<div class="bg-base-200 rounded-lg p-4">
					<p class="font-semibold">{reminder.title}</p>
					{#if reminder.description}
						<p class="mt-1 text-sm opacity-70">{reminder.description}</p>
					{/if}
					<div class="mt-2 flex gap-2">
						<span class="badge badge-outline gap-1">
							<span>{getCategoryIcon(reminder.category)}</span>
							<span class="capitalize">{reminder.category}</span>
						</span>
						<span class="badge {getPriorityColor(reminder.priority)}">
							{reminder.priority}
						</span>
					</div>
				</div>
				<p class="text-warning mt-4 text-sm">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="inline h-4 w-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
						/>
					</svg>
					Tindakan ini tidak dapat dibatalkan.
				</p>
			</div>
			<div class="modal-action">
				<button
					type="button"
					class="btn btn-ghost"
					onclick={onClose}
					disabled={deletingId === reminder.id}
				>
					Tidak
				</button>
				<form
					method="POST"
					action="?/delete"
					use:enhance={() => {
						onDeleteStart();
						return async ({ result, update }) => {
							if (result.type === 'success') {
								await update();
								onClose();
							} else if (result.type === 'failure') {
								alert(result.data?.message || 'Gagal menghapus reminder');
							}
							onDeleteEnd();
						};
					}}
				>
					<input type="hidden" name="id" value={reminder.id} />
					<button type="submit" class="btn btn-error" disabled={deletingId === reminder.id}>
						{#if deletingId === reminder.id}
							<span class="loading loading-spinner loading-sm"></span>
							Menghapus...
						{:else}
							Ya, Hapus
						{/if}
					</button>
				</form>
			</div>
		</div>
		<div
			class="modal-backdrop"
			role="button"
			tabindex="0"
			onkeydown={(e) => e.key === 'Escape' && !deletingId && onClose()}
			onclick={() => !deletingId && onClose()}
		></div>
	</div>
{/if}
