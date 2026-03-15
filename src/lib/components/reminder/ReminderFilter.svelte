<script lang="ts">
	interface Props {
		statusFilter: string;
		priorityFilter: string;
		sortBy: string;
		isLoading?: boolean;
		onStatusChange: (value: string) => void;
		onPriorityChange: (value: string) => void;
		onSortChange: (value: string) => void;
	}

	let {
		statusFilter,
		priorityFilter,
		sortBy,
		isLoading = false,
		onStatusChange,
		onPriorityChange,
		onSortChange
	}: Props = $props();
</script>

<div class="card bg-base-100 shadow-lg">
	<div class="card-body p-4">
		<div class="flex flex-col gap-4 sm:flex-row">
			<!-- Status Filter -->
			<div class="form-control">
				<label class="label mb-1 py-0" for="filter">
					<span class="label-text text-xs font-semibold">Status</span>
				</label>
				<select
					class="select select-bordered select-sm"
					id="filter"
					value={statusFilter}
					onchange={(e) => onStatusChange(e.currentTarget.value)}
					disabled={isLoading}
				>
					<option value="all">All</option>
					<option value="active">Active</option>
					<option value="completed">Completed</option>
				</select>
			</div>

			<!-- Priority Filter -->
			<div class="form-control">
				<label class="label mb-1 py-0" for="priority-filter">
					<span class="label-text text-xs font-semibold">Priority</span>
				</label>
				<select
					class="select select-bordered select-sm"
					id="priority-filter"
					value={priorityFilter}
					onchange={(e) => onPriorityChange(e.currentTarget.value)}
					disabled={isLoading}
				>
					<option value="all">All Priority</option>
					<option value="high">High</option>
					<option value="medium">Medium</option>
					<option value="low">Low</option>
				</select>
			</div>

			<!-- Sort -->
			<div class="form-control">
				<label class="label mb-1 py-0" for="sortby">
					<span class="label-text text-xs font-semibold">Sort By</span>
				</label>
				<select
					class="select select-bordered select-sm"
					id="sortby"
					value={sortBy}
					onchange={(e) => onSortChange(e.currentTarget.value)}
					disabled={isLoading}
				>
					<option value="date">Date</option>
					<option value="priority">Priority</option>
					<option value="title">Title</option>
				</select>
			</div>
		</div>
	</div>
</div>
