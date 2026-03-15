<script lang="ts">
	import StatCard from '$lib/components/StatCard.svelte';
	import { remindersStore } from '$lib/stores/reminder.store';
	import { resolve } from '$app/paths';

	let priorityData = $derived.by(() => {
		if (!$remindersStore?.reminders) return { high: 0, medium: 0, low: 0 };

		const reminders = $remindersStore.reminders.filter((r) => !r.is_completed);
		return {
			high: reminders.filter((r) => r.priority === 'high').length,
			medium: reminders.filter((r) => r.priority === 'medium').length,
			low: reminders.filter((r) => r.priority === 'low').length
		};
	});

	let categoryData = $derived.by(() => {
		if (!$remindersStore?.reminders) return {};

		const reminders = $remindersStore.reminders.filter((r) => !r.is_completed);
		const categories: Record<string, number> = {};

		reminders.forEach((r) => {
			categories[r.category] = (categories[r.category] || 0) + 1;
		});

		return categories;
	});

	let recentReminders = $derived.by(() => {
		if (!$remindersStore?.reminders) return [];

		return [...$remindersStore.reminders]
			.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
			.slice(0, 5);
	});

	let upcomingReminders = $derived.by(() => {
		if (!$remindersStore?.reminders) return [];

		const now = new Date();
		return [...$remindersStore.reminders]
			.filter((r) => !r.is_completed && new Date(r.date) > now)
			.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
			.slice(0, 5);
	});

	let completionRate = $derived.by(() => {
		if (!$remindersStore?.total || $remindersStore.total === 0) return 0;
		return Math.round(($remindersStore?.completed / $remindersStore.total) * 100);
	});

	function getCategoryIcon(category: string) {
		const icons: Record<string, string> = {
			personal: '👤',
			work: '💼',
			health: '💪',
			shopping: '🛒',
			other: '📌'
		};
		return icons[category] || '📌';
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

	function formatDate(dateStr: string) {
		const date = new Date(dateStr);
		const now = new Date();
		const diffTime = date.getTime() - now.getTime();
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

		if (diffDays === 0) return 'Today';
		if (diffDays === 1) return 'Tomorrow';
		if (diffDays > 0 && diffDays <= 7) return `In ${diffDays} days`;

		return date.toLocaleDateString('id-ID', {
			day: 'numeric',
			month: 'short',
			year: 'numeric'
		});
	}

	function formatTime(timeStr: string) {
		return timeStr.split('T')[1]?.substring(0, 5) || timeStr;
	}

	let maxCategoryValue = $derived(Math.max(...Object.values(categoryData), 1));
</script>

<svelte:head>
	<title>Dashboard - Reminder Management System | Never Miss Important Tasks</title>
	<meta
		name="description"
		content="Manage all your reminders in one place. Track upcoming tasks, monitor completion rates, and stay organized with our comprehensive reminder dashboard."
	/>
	<meta
		name="keywords"
		content="reminder dashboard, task management, productivity, to-do list, task tracker, reminder app"
	/>

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Dashboard - Reminder Management System" />
	<meta
		property="og:description"
		content="Track and manage all your reminders efficiently with real-time statistics and insights."
	/>

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Dashboard - Reminder Management System" />
	<meta
		name="twitter:description"
		content="Track and manage all your reminders efficiently with real-time statistics and insights."
	/>

	<!-- Structured Data for SEO -->
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "WebApplication",
			"name": "Reminder Management System",
			"applicationCategory": "ProductivityApplication",
			"offers": {
				"@type": "Offer",
				"price": "0",
				"priceCurrency": "USD"
			},
			"description": "A comprehensive reminder and task management system to help you stay organized and never miss important events."
		}
	</script>
</svelte:head>

<div class="space-y-6">
	<!-- Header -->
	<header>
		<h1 class="text-3xl font-bold">Dashboard</h1>
		<p class="mt-1 text-sm opacity-70">Overview of your reminders and tasks</p>
	</header>

	<!-- Stats Cards -->
	<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
		{#if $remindersStore?.isLoading}
			{#each [1, 2, 3, 4] as item (item)}
				<div class="card bg-base-100 shadow-lg">
					<div class="card-body p-6">
						<div class="skeleton mb-2 h-4 w-24"></div>
						<div class="skeleton h-8 w-16"></div>
					</div>
				</div>
			{/each}
		{:else}
			<StatCard title="Total Reminders" value={$remindersStore?.total || 0} icon="📝" />
			<StatCard title="Upcoming" value={$remindersStore?.upcoming || 0} icon="⏳" />
			<StatCard title="Late" value={$remindersStore?.late || 0} icon="🔔" />
			<StatCard title="Completed" value={$remindersStore?.completed || 0} icon="✅" />
		{/if}
	</div>

	<!-- Charts Section -->
	<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
		<!-- Priority Distribution -->
		<div class="card bg-base-100 shadow-lg">
			<div class="card-body">
				<h2 class="card-title mb-4 text-lg">
					<span class="text-2xl">📊</span>
					Priority Distribution
				</h2>

				{#if $remindersStore?.isLoading}
					<div class="space-y-4">
						{#each [1, 2, 3] as item (item)}
							<div class="space-y-2">
								<div class="skeleton h-4 w-20"></div>
								<div class="skeleton h-6 w-full"></div>
							</div>
						{/each}
					</div>
				{:else if priorityData.high + priorityData.medium + priorityData.low === 0}
					<div class="py-8 text-center opacity-60">
						<p>No active reminders</p>
					</div>
				{:else}
					<div class="space-y-4">
						<!-- High Priority -->
						<div>
							<div class="mb-1 flex items-center justify-between text-sm">
								<span class="font-semibold">🔴 High Priority</span>
								<span class="badge badge-error badge-sm">{priorityData.high}</span>
							</div>
							<div class="bg-base-200 h-3 w-full overflow-hidden rounded-full">
								<div
									class="bg-error h-full transition-all duration-500"
									style="width: {(priorityData.high /
										(priorityData.high + priorityData.medium + priorityData.low)) *
										100}%"
								></div>
							</div>
						</div>

						<!-- Medium Priority -->
						<div>
							<div class="mb-1 flex items-center justify-between text-sm">
								<span class="font-semibold">🟡 Medium Priority</span>
								<span class="badge badge-warning badge-sm">{priorityData.medium}</span>
							</div>
							<div class="bg-base-200 h-3 w-full overflow-hidden rounded-full">
								<div
									class="bg-warning h-full transition-all duration-500"
									style="width: {(priorityData.medium /
										(priorityData.high + priorityData.medium + priorityData.low)) *
										100}%"
								></div>
							</div>
						</div>

						<!-- Low Priority -->
						<div>
							<div class="mb-1 flex items-center justify-between text-sm">
								<span class="font-semibold">🟢 Low Priority</span>
								<span class="badge badge-success badge-sm">{priorityData.low}</span>
							</div>
							<div class="bg-base-200 h-3 w-full overflow-hidden rounded-full">
								<div
									class="bg-success h-full transition-all duration-500"
									style="width: {(priorityData.low /
										(priorityData.high + priorityData.medium + priorityData.low)) *
										100}%"
								></div>
							</div>
						</div>
					</div>
				{/if}
			</div>
		</div>

		<!-- Category Breakdown -->
		<div class="card bg-base-100 shadow-lg">
			<div class="card-body">
				<h2 class="card-title mb-4 text-lg">
					<span class="text-2xl">📁</span>
					Category Breakdown
				</h2>

				{#if $remindersStore?.isLoading}
					<div class="space-y-4">
						{#each [1, 2, 3, 4] as item (item)}
							<div class="space-y-2">
								<div class="skeleton h-4 w-24"></div>
								<div class="skeleton h-6 w-full"></div>
							</div>
						{/each}
					</div>
				{:else if Object.keys(categoryData).length === 0}
					<div class="py-8 text-center opacity-60">
						<p>No active reminders</p>
					</div>
				{:else}
					<div class="space-y-3">
						{#each Object.entries(categoryData) as [category, count] (category)}
							<div>
								<div class="mb-1 flex items-center justify-between text-sm">
									<span class="flex items-center gap-2">
										<span>{getCategoryIcon(category)}</span>
										<span class="font-semibold capitalize">{category}</span>
									</span>
									<span class="badge badge-outline badge-sm">{count}</span>
								</div>
								<div class="bg-base-200 h-2 w-full overflow-hidden rounded-full">
									<div
										class="bg-primary h-full transition-all duration-500"
										style="width: {(count / maxCategoryValue) * 100}%"
									></div>
								</div>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>

	<!-- Completion Rate & Quick Stats -->
	<div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
		<!-- Completion Rate -->
		<div class="card from-primary to-secondary text-primary-content bg-gradient-to-br shadow-lg">
			<div class="card-body items-center text-center">
				<h2 class="card-title text-lg">Completion Rate</h2>
				{#if $remindersStore?.isLoading}
					<div class="skeleton h-24 w-24 rounded-full"></div>
				{:else}
					<div class="relative">
						<svg class="h-32 w-32 -rotate-90 transform">
							<circle
								cx="64"
								cy="64"
								r="56"
								stroke="currentColor"
								stroke-width="8"
								fill="none"
								class="opacity-30"
							/>
							<circle
								cx="64"
								cy="64"
								r="56"
								stroke="currentColor"
								stroke-width="8"
								fill="none"
								stroke-dasharray={2 * Math.PI * 56}
								stroke-dashoffset={2 * Math.PI * 56 * (1 - completionRate / 100)}
								class="transition-all duration-1000"
								stroke-linecap="round"
							/>
						</svg>
						<div class="absolute inset-0 flex items-center justify-center">
							<span class="text-3xl font-bold">{completionRate}%</span>
						</div>
					</div>
				{/if}
				<p class="text-sm opacity-90">of all reminders completed</p>
			</div>
		</div>

		<!-- Active Tasks -->
		<div class="card bg-base-100 shadow-lg">
			<div class="card-body">
				<div class="flex items-center gap-3">
					<div class="bg-info/20 flex h-12 w-12 items-center justify-center rounded-full text-2xl">
						🎯
					</div>
					<div>
						<p class="text-sm opacity-70">Active Tasks</p>
						{#if $remindersStore?.isLoading}
							<div class="skeleton h-8 w-16"></div>
						{:else}
							<p class="text-info text-3xl font-bold">{$remindersStore?.active || 0}</p>
						{/if}
					</div>
				</div>
				<div class="mt-2">
					<div class="text-xs opacity-60">Keep up the momentum!</div>
				</div>
			</div>
		</div>

		<!-- This Week -->
		<div class="card bg-base-100 shadow-lg">
			<div class="card-body">
				<div class="flex items-center gap-3">
					<div
						class="bg-warning/20 flex h-12 w-12 items-center justify-center rounded-full text-2xl"
					>
						📅
					</div>
					<div>
						<p class="text-sm opacity-70">This Week</p>
						{#if $remindersStore?.isLoading}
							<div class="skeleton h-8 w-16"></div>
						{:else}
							<p class="text-warning text-3xl font-bold">
								{$remindersStore?.reminders?.filter((r) => {
									const reminderDate = new Date(r.date);
									const now = new Date();
									const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
									return !r.is_completed && reminderDate >= now && reminderDate <= weekFromNow;
								}).length || 0}
							</p>
						{/if}
					</div>
				</div>
				<div class="mt-2">
					<div class="text-xs opacity-60">Upcoming this week</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Recent & Upcoming Reminders -->
	<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
		<!-- Upcoming Reminders -->
		<div class="card bg-base-100 shadow-lg">
			<div class="card-body">
				<h2 class="card-title mb-4 text-lg">
					<span class="text-2xl">🔜</span>
					Upcoming Reminders
				</h2>

				{#if $remindersStore?.isLoading}
					<div class="space-y-3">
						{#each [1, 2, 3] as item (item)}
							<div class="border-base-300 flex items-center gap-3 rounded-lg border p-3">
								<div class="skeleton h-10 w-10 rounded"></div>
								<div class="flex-1 space-y-2">
									<div class="skeleton h-4 w-3/4"></div>
									<div class="skeleton h-3 w-1/2"></div>
								</div>
							</div>
						{/each}
					</div>
				{:else if upcomingReminders.length === 0}
					<div class="py-8 text-center opacity-60">
						<p>No upcoming reminders</p>
						<p class="mt-1 text-sm">You're all caught up! 🎉</p>
					</div>
				{:else}
					<div class="space-y-2">
						{#each upcomingReminders as reminder (reminder.id)}
							<a
								href={resolve('/reminders')}
								class="border-base-300 hover:border-primary hover:bg-base-200 flex items-center gap-3 rounded-lg border p-3 transition-all"
							>
								<div
									class="bg-primary/10 flex h-10 w-10 items-center justify-center rounded text-xl"
								>
									{getCategoryIcon(reminder.category)}
								</div>
								<div class="min-w-0 flex-1">
									<p class="truncate font-semibold">{reminder.title}</p>
									<div class="flex items-center gap-2 text-xs opacity-70">
										<span>{formatDate(reminder.date)}</span>
										<span>•</span>
										<span>{formatTime(reminder.time)}</span>
									</div>
								</div>
								<span class="badge {getPriorityColor(reminder.priority)} badge-sm">
									{reminder.priority}
								</span>
							</a>
						{/each}
					</div>
					{#if upcomingReminders.length >= 5}
						<div class="mt-4 text-center">
							<a href={resolve('/reminders')} class="btn btn-ghost btn-sm">View All →</a>
						</div>
					{/if}
				{/if}
			</div>
		</div>

		<!-- Recently Added -->
		<div class="card bg-base-100 shadow-lg">
			<div class="card-body">
				<h2 class="card-title mb-4 text-lg">
					<span class="text-2xl">🆕</span>
					Recently Added
				</h2>

				{#if $remindersStore?.isLoading}
					<div class="space-y-3">
						{#each [1, 2, 3] as item (item)}
							<div class="border-base-300 flex items-center gap-3 rounded-lg border p-3">
								<div class="skeleton h-10 w-10 rounded"></div>
								<div class="flex-1 space-y-2">
									<div class="skeleton h-4 w-3/4"></div>
									<div class="skeleton h-3 w-1/2"></div>
								</div>
							</div>
						{/each}
					</div>
				{:else if recentReminders.length === 0}
					<div class="py-8 text-center opacity-60">
						<p>No reminders yet</p>
						<p class="mt-1 text-sm">Create your first reminder!</p>
					</div>
				{:else}
					<div class="space-y-2">
						{#each recentReminders as reminder (reminder.id)}
							<a
								href={resolve('/reminders')}
								class="border-base-300 hover:border-primary hover:bg-base-200 flex items-center gap-3 rounded-lg border p-3 transition-all"
							>
								<div
									class="bg-secondary/10 flex h-10 w-10 items-center justify-center rounded text-xl"
								>
									{getCategoryIcon(reminder.category)}
								</div>
								<div class="min-w-0 flex-1">
									<p
										class="truncate font-semibold {reminder.is_completed
											? 'line-through opacity-60'
											: ''}"
									>
										{reminder.title}
									</p>
									<div class="flex items-center gap-2 text-xs opacity-70">
										<span>{formatDate(reminder.date)}</span>
										{#if reminder.is_completed}
											<span class="badge badge-success badge-xs">Completed</span>
										{/if}
									</div>
								</div>
								<span class="badge {getPriorityColor(reminder.priority)} badge-sm">
									{reminder.priority}
								</span>
							</a>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>

	<!-- Quick Actions -->
	<div class="card bg-base-100 shadow-lg">
		<div class="card-body">
			<h2 class="card-title mb-4 text-lg">
				<span class="text-2xl">⚡</span>
				Quick Actions
			</h2>
			<div class="grid grid-cols-2 gap-4 md:grid-cols-4">
				<a href={resolve('/reminders')} class="btn btn-outline gap-2">
					<span class="text-xl">➕</span>
					New Reminder
				</a>
				<a href={resolve('/reminders?filter=active')} class="btn btn-outline gap-2">
					<span class="text-xl">📋</span>
					View Active
				</a>
				<a href={resolve('/reminders?filter=completed')} class="btn btn-outline gap-2">
					<span class="text-xl">✅</span>
					Completed
				</a>
				<a href={resolve('/reminders?priority=high')} class="btn btn-outline gap-2">
					<span class="text-xl">🔥</span>
					High Priority
				</a>
			</div>
		</div>
	</div>
</div>
