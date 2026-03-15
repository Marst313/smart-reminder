<script lang="ts">
	interface Props {
		show: boolean;
		editingId?: number;
		title: string;
		description: string;
		date: string;
		time: string;
		category: 'personal' | 'work' | 'health' | 'shopping' | 'other';
		priority: 'high' | 'medium' | 'low';
		recurring: boolean;
		onClose: () => void;
		onUpdateField: (
			field: 'date' | 'title' | 'description' | 'time' | 'category' | 'priority' | 'recurring',
			value: any
		) => void;
	}

	let {
		show,
		editingId,
		title,
		description,
		date,
		time,
		category,
		priority,
		recurring,
		onClose,
		onUpdateField
	}: Props = $props();
</script>

{#if show}
	<div class="modal modal-open" role="dialog" aria-labelledby="modal-title" aria-modal="true">
		<div class="modal-box max-w-2xl">
			<h2 id="modal-title" class="mb-6 text-2xl font-bold">
				{editingId ? 'Edit Reminder' : 'New Reminder'}
			</h2>

			<form method="POST" action={`${editingId ? '?/update' : '?/create'}`} class="space-y-4">
				<!-- ID -->
				{#if editingId}
					<input type="hidden" name="id" value={editingId} />
				{/if}

				<!-- Title -->
				<div class="form-control flex flex-col">
					<label class="label" for="title">
						<span class="label-text font-semibold">Title</span>
						<span class="label-text-alt text-error">*</span>
					</label>
					<input
						id="title"
						type="text"
						placeholder="e.g., Team Meeting"
						class="input input-bordered w-full"
						value={title}
						oninput={(e) => onUpdateField('title', e.currentTarget.value)}
						name="title"
						required
					/>
				</div>

				<!-- Description -->
				<div class="form-control flex flex-col">
					<label class="label" for="description">
						<span class="label-text font-semibold">Description</span>
					</label>
					<textarea
						id="description"
						class="textarea textarea-bordered h-20 w-full resize-none"
						placeholder="Add more details..."
						value={description}
						oninput={(e) => onUpdateField('description', e.currentTarget.value)}
						name="description"
					></textarea>
				</div>

				<!-- Date & Time -->
				<div class="grid grid-cols-2 gap-4">
					<div class="form-control">
						<label class="label" for="date">
							<span class="label-text font-semibold">Date</span>
							<span class="label-text-alt text-error">*</span>
						</label>
						<input
							id="date"
							type="date"
							class="input input-bordered"
							value={date}
							oninput={(e) => onUpdateField('date', e.currentTarget.value)}
							required
							name="date"
						/>
					</div>

					<div class="form-control">
						<label class="label" for="time">
							<span class="label-text font-semibold">Time</span>
							<span class="label-text-alt text-error">*</span>
						</label>
						<input
							id="time"
							type="time"
							class="input input-bordered"
							value={time}
							oninput={(e) => onUpdateField('time', e.currentTarget.value)}
							required
							name="time"
						/>
					</div>
				</div>

				<!-- Category & Priority -->
				<div class="grid grid-cols-2 gap-4">
					<div class="form-control">
						<label class="label" for="category">
							<span class="label-text font-semibold">Category</span>
						</label>
						<select
							id="category"
							class="select select-bordered"
							value={category}
							onchange={(e) => onUpdateField('category', e.currentTarget.value)}
							name="category"
						>
							<option value="personal">👤 Personal</option>
							<option value="work">💼 Work</option>
							<option value="health">💪 Health</option>
							<option value="shopping">🛒 Shopping</option>
							<option value="other">📌 Other</option>
						</select>
					</div>

					<div class="form-control">
						<label class="label" for="priority">
							<span class="label-text font-semibold">Priority</span>
						</label>
						<select
							id="priority"
							class="select select-bordered"
							value={priority}
							onchange={(e) => onUpdateField('priority', e.currentTarget.value)}
							name="priority"
						>
							<option value="low">🟢 Low</option>
							<option value="medium">🟡 Medium</option>
							<option value="high">🔴 High</option>
						</select>
					</div>
				</div>

				<!-- Recurring -->
				<div class="form-control">
					<label class="label cursor-pointer justify-start gap-4">
						<input
							type="checkbox"
							class="checkbox"
							checked={recurring}
							onchange={(e) => onUpdateField('recurring', e.currentTarget.checked)}
							name="recurring"
						/>
						<div>
							<span class="label-text font-semibold">Recurring Reminder</span>
							<p class="text-xs opacity-60">Repeat this reminder regularly</p>
						</div>
					</label>
				</div>

				<!-- Actions -->
				<div class="modal-action">
					<button type="button" class="btn btn-ghost" onclick={onClose}> Cancel </button>
					<button type="submit" class="btn btn-primary">
						{editingId ? 'Update' : 'Create'} Reminder
					</button>
				</div>
			</form>
		</div>
		<div
			class="modal-backdrop"
			role="button"
			tabindex="0"
			onkeydown={(e) => e.key === 'Escape' && onClose()}
			onclick={onClose}
		></div>
	</div>
{/if}
