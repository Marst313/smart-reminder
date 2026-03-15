<script lang="ts">
	import { notifications, unreadCount, type TNotification } from '$lib/stores/reminder.store';

	let filter = $state<'all' | 'unread' | 'read'>('all');
	let selectedIds = $state<number[]>([]);

	let allNotifications = $state<TNotification[]>([]);

	notifications.subscribe((items) => {
		allNotifications = items;
	});

	let filteredNotifications = $derived(() => {
		if (filter === 'unread') {
			return allNotifications.filter((n) => !n.read);
		} else if (filter === 'read') {
			return allNotifications.filter((n) => n.read);
		}
		return allNotifications;
	});

	function getPriorityBadge(priority: string) {
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

	function markAsRead(id: number) {
		notifications.markAsRead(id);
	}

	function markAllAsRead() {
		notifications.markAllAsRead();
	}

	function deleteNotification(id: number) {
		notifications.delete(id);

		// Remove selected if it was selected
		selectedIds = selectedIds.filter((sid) => sid !== id);
	}

	function toggleSelect(id: number) {
		if (selectedIds.includes(id)) {
			selectedIds = selectedIds.filter((sid) => sid !== id);
		} else {
			selectedIds = [...selectedIds, id];
		}
	}

	function selectAll() {
		const filtered = filteredNotifications();
		selectedIds = filtered.map((n) => n.id);
	}

	function deselectAll() {
		selectedIds = [];
	}

	function deleteSelected() {
		notifications.deleteMultiple(selectedIds);
		selectedIds = [];
	}

	function markSelectedAsRead() {
		notifications.markMultipleAsRead(selectedIds);
		selectedIds = [];
	}
</script>

<div class="space-y-6">
	<!-- Header -->
	<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<h1 class="text-3xl font-bold">Notifications</h1>
			<p class="mt-1 text-sm opacity-70">Stay updated with your reminders and activities</p>
		</div>
		<div class="flex items-center gap-2">
			{#if $unreadCount > 0}
				<div class="badge badge-primary badge-lg gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						class="h-4 w-4"
					>
						<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
						<path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
					</svg>
					{$unreadCount} New
				</div>
			{/if}
			<button class="btn btn-outline btn-sm gap-2" onclick={markAllAsRead}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					class="h-4 w-4"
				>
					<polyline points="20 6 9 17 4 12"></polyline>
				</svg>
				Mark All Read
			</button>
		</div>
	</div>

	<!-- Filters & Actions -->
	<div class="card bg-base-100 shadow-lg">
		<div class="card-body p-4">
			<div class="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
				<!-- Filter Tabs -->
				<div class="tabs tabs-boxed">
					<button
						class="tab {filter === 'all' ? 'tab-active' : ''}"
						onclick={() => (filter = 'all')}
					>
						All ({allNotifications.length})
					</button>
					<button
						class="tab {filter === 'unread' ? 'tab-active' : ''}"
						onclick={() => (filter = 'unread')}
					>
						Unread ({$unreadCount})
					</button>
					<button
						class="tab {filter === 'read' ? 'tab-active' : ''}"
						onclick={() => (filter = 'read')}
					>
						Read ({allNotifications.length - $unreadCount})
					</button>
				</div>

				<!-- Bulk Actions -->
				{#if selectedIds.length > 0}
					<div class="flex items-center gap-2">
						<span class="text-sm font-semibold">{selectedIds.length} selected</span>
						<div class="divider divider-horizontal"></div>
						<button
							class="btn btn-ghost btn-sm"
							aria-label="mark selected as read"
							onclick={markSelectedAsRead}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								class="h-4 w-4"
							>
								<polyline points="20 6 9 17 4 12"></polyline>
							</svg>
						</button>
						<button
							class="btn btn-ghost btn-sm text-error"
							aria-label="delete-selected"
							onclick={deleteSelected}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								class="h-4 w-4"
							>
								<polyline points="3 6 5 6 21 6"></polyline>
								<path
									d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
								></path>
							</svg>
						</button>
						<button aria-label="deselect-all" class="btn btn-ghost btn-sm" onclick={deselectAll}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								class="h-4 w-4"
							>
								<line x1="18" y1="6" x2="6" y2="18"></line>
								<line x1="6" y1="6" x2="18" y2="18"></line>
							</svg>
						</button>
					</div>
				{:else}
					<button class="btn btn-ghost btn-sm" onclick={selectAll}> Select All </button>
				{/if}
			</div>
		</div>
	</div>

	<!-- Notifications List -->
	<div class="space-y-3">
		{#if filteredNotifications().length === 0}
			<div class="card bg-base-100 shadow-lg">
				<div class="card-body items-center py-12 text-center">
					<div class="mb-4 text-6xl">📭</div>
					<h3 class="text-xl font-bold">No notifications</h3>
					<p class="opacity-70">
						{filter === 'unread'
							? 'All caught up! You have no unread notifications.'
							: filter === 'read'
								? 'No read notifications yet.'
								: "You don't have any notifications yet."}
					</p>
				</div>
			</div>
		{:else}
			{#each filteredNotifications() as notification (notification.id)}
				<div
					class="card bg-base-100 shadow transition-all duration-200 hover:shadow-xl {!notification.read
						? 'border-primary border-l-4'
						: ''}"
				>
					<div class="card-body p-4">
						<div class="flex items-start gap-4">
							<!-- Checkbox -->
							<input
								type="checkbox"
								class="checkbox checkbox-sm mt-1"
								checked={selectedIds.includes(notification.id)}
								onchange={() => toggleSelect(notification.id)}
							/>

							<!-- Icon -->
							<div class="shrink-0">
								<div class="avatar placeholder">
									<div
										class="bg-{notification.type === 'reminder'
											? 'info'
											: notification.type === 'success'
												? 'success'
												: notification.type === 'warning'
													? 'warning'
													: 'error'} text-{notification.type === 'reminder'
											? 'info'
											: notification.type === 'success'
												? 'success'
												: notification.type === 'warning'
													? 'warning'
													: 'error'}-content w-12 rounded-full"
									>
										<span class="text-2xl">{notification.icon}</span>
									</div>
								</div>
							</div>

							<!-- Content -->
							<div class="min-w-0 flex-1">
								<div class="mb-1 flex items-start justify-between gap-2">
									<h3 class="text-lg font-bold">{notification.title}</h3>
									<div class="flex items-center gap-2">
										<div class="badge {getPriorityBadge(notification.priority)} badge-sm">
											{notification.priority}
										</div>
										{#if !notification.read}
											<div class="badge badge-primary badge-sm">New</div>
										{/if}
									</div>
								</div>
								<p class="mb-2 opacity-70">{notification.message}</p>
								<div class="flex items-center gap-2 text-sm opacity-60">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										class="h-4 w-4"
									>
										<circle cx="12" cy="12" r="10"></circle>
										<polyline points="12 6 12 12 16 14"></polyline>
									</svg>
									<span>{notification.time}</span>
								</div>
							</div>

							<!-- Actions -->
							<div class="dropdown dropdown-end shrink-0">
								<button tabindex="0" class="btn btn-ghost btn-sm btn-circle" aria-label="dropdown">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										class="h-5 w-5"
									>
										<circle cx="12" cy="12" r="1"></circle>
										<circle cx="12" cy="5" r="1"></circle>
										<circle cx="12" cy="19" r="1"></circle>
									</svg>
								</button>
								<ul
									tabindex="-1"
									class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-lg"
								>
									{#if !notification.read}
										<li>
											<button onclick={() => markAsRead(notification.id)}>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													stroke-width="2"
													class="h-4 w-4"
												>
													<polyline points="20 6 9 17 4 12"></polyline>
												</svg>
												Mark as Read
											</button>
										</li>
									{/if}
									<li>
										<button>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-width="2"
												class="h-4 w-4"
											>
												<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
												<circle cx="12" cy="12" r="3"></circle>
											</svg>
											View Details
										</button>
									</li>
									<li>
										<button
											aria-label="delete-notification"
											class="text-error"
											onclick={() => deleteNotification(notification.id)}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-width="2"
												class="h-4 w-4"
											>
												<polyline points="3 6 5 6 21 6"></polyline>
												<path
													d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
												></path>
											</svg>
											Delete
										</button>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			{/each}
		{/if}
	</div>

	<!-- Load More -->
	{#if filteredNotifications().length > 0}
		<div class="text-center">
			<button class="btn btn-outline">
				Load More Notifications
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					class="h-4 w-4"
				>
					<polyline points="6 9 12 15 18 9"></polyline>
				</svg>
			</button>
		</div>
	{/if}
</div>
