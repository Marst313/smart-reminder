<script lang="ts">
	import { auth } from '$lib/stores/auth.store';
	import { reminders } from '$lib/stores/reminder.store';

	let editing = false;
	let name = '';
	let email = '';
	let phone = '';
	let bio = '';
	let avatarUrl = '';
	let saving = false;

	$: if ($auth?.user) {
		name = $auth.user.name;
		email = $auth.user.email;
		phone = $auth.user.phone;
		bio = $auth.user.bio;
		avatarUrl = $auth.user.avatarUrl;
	}

	async function handleSave() {
		saving = true;

		// TODO: Save to backend via gRPC
		await new Promise((resolve) => setTimeout(resolve, 1000));
		editing = false;
		saving = false;
	}

	function handleCancel() {
		// Reset to original values
		if ($auth?.user) {
			name = $auth.user.name;
			email = $auth.user.email;
			phone = $auth.user.phone;
			bio = $auth.user.bio;
		}
		editing = false;
	}

	function getInitials(fullName: string) {
		if (!fullName) return 'U';
		const names = fullName.split(' ');
		if (names.length === 1) return names[0][0].toUpperCase();
		return (names[0][0] + names[names.length - 1][0]).toUpperCase();
	}
</script>

<div class="space-y-6">
	<!-- Header -->
	<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<h1 class="text-3xl font-bold">Profile Settings</h1>
			<p class="mt-1 text-sm opacity-70">Manage your account information and preferences</p>
		</div>
	</div>

	<div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
		<!-- Profile Card -->
		<div class="lg:col-span-1">
			<div class="card bg-base-200 shadow-xl">
				<div class="card-body items-center text-center">
					<!-- Avatar -->
					<div class="avatar placeholder">
						<div
							class="bg-primary text-primary-content flex w-32 items-center justify-center rounded-full"
						>
							{#if avatarUrl}
								<img src={avatarUrl} alt="Avatar" />
							{:else}
								<span class="text-4xl">{getInitials(name)}</span>
							{/if}
						</div>
					</div>

					<!-- Upload Avatar Button -->
					{#if editing}
						<button class="btn btn-outline btn-sm mt-4">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								class="h-4 w-4"
							>
								<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
								<polyline points="17 8 12 3 7 8"></polyline>
								<line x1="12" y1="3" x2="12" y2="15"></line>
							</svg>
							Upload Photo
						</button>
					{/if}

					<div class="divider"></div>

					<!-- Profile Info -->
					<div class="w-full space-y-3 text-left">
						<div class="flex items-center gap-3">
							<div class="text-primary">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									class="h-5 w-5"
								>
									<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
									<circle cx="12" cy="7" r="4"></circle>
								</svg>
							</div>
							<div class="flex-1">
								<p class="text-xs opacity-60">Full Name</p>
								<p class="font-semibold text-white">{name}</p>
							</div>
						</div>

						<div class="flex items-center gap-3">
							<div class="text-primary">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									class="h-5 w-5"
								>
									<path
										d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
									></path>
									<polyline points="22,6 12,13 2,6"></polyline>
								</svg>
							</div>
							<div class="flex-1">
								<p class="text-xs opacity-60">Email</p>
								<p class="font-semibold break-all">{email}</p>
							</div>
						</div>

						<div class="flex items-center gap-3">
							<div class="text-primary">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									class="h-5 w-5"
								>
									<path
										d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
									></path>
								</svg>
							</div>
							<div class="flex-1">
								<p class="text-xs opacity-60">Phone</p>
								<p class="font-semibold">{phone}</p>
							</div>
						</div>
					</div>

					<div class="divider"></div>

					<!-- Stats -->
					<div class="stats stats-vertical w-full shadow">
						<div class="stat p-4">
							<div class="stat-title text-xs">Member Since</div>
							<div class="stat-value text-primary text-lg">Jan 2026</div>
						</div>
						<div class="stat p-4">
							<div class="stat-title text-xs">Total Reminders</div>
							<div class="stat-value text-secondary text-lg">{$reminders.length}</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Edit Form -->
		<div class="space-y-6 lg:col-span-2">
			<!-- Personal Information -->
			<div class="card bg-base-200 shadow-xl">
				<div class="card-body">
					<div class="mb-4 flex items-center justify-between">
						<h2 class="card-title">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								class="h-5 w-5"
							>
								<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
								<circle cx="12" cy="7" r="4"></circle>
							</svg>
							Personal Information
						</h2>
						{#if !editing}
							<button class="btn btn-ghost btn-sm gap-2" on:click={() => (editing = true)}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									class="h-4 w-4"
								>
									<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
									<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
								</svg>
								Edit
							</button>
						{/if}
					</div>

					<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
						<div class="form-control">
							<label class="label" for="name">
								<span class="label-text font-semibold">Full Name</span>
								{#if editing}
									<span class="label-text-alt text-error">*</span>
								{/if}
							</label>
							<input
								id="name"
								type="text"
								placeholder="Enter your name"
								class="input input-bordered"
								bind:value={name}
								disabled={!editing}
								required
							/>
						</div>

						<div class="form-control">
							<label class="label" for="email">
								<span class="label-text font-semibold">Email Address</span>
								<span class="label-text-alt text-info">Cannot be changed</span>
							</label>
							<input
								id="email"
								type="email"
								class="input input-bordered"
								bind:value={email}
								disabled
							/>
						</div>

						<div class="form-control flex flex-col md:col-span-2">
							<label class="label" for="phone">
								<span class="label-text font-semibold">Phone Number</span>
							</label>
							<input
								id="phone"
								type="tel"
								placeholder="+62 812-3456-7890"
								class="input input-bordered"
								bind:value={phone}
								disabled={!editing}
							/>
						</div>

						<div class="form-control flex flex-col md:col-span-2">
							<label class="label" for="bio">
								<span class="label-text font-semibold">Bio</span>
								<span class="label-text-alt">{bio.length}/200</span>
							</label>
							<textarea
								id="bio"
								class="textarea textarea-bordered h-24 resize-none"
								placeholder="Tell us about yourself..."
								bind:value={bio}
								disabled={!editing}
								maxlength="200"
							></textarea>
						</div>
					</div>

					{#if editing}
						<div class="card-actions mt-4 justify-end">
							<button class="btn btn-ghost" on:click={handleCancel} disabled={saving}>
								Cancel
							</button>
							<button class="btn btn-primary gap-2" on:click={handleSave} disabled={saving}>
								{#if saving}
									<span class="loading loading-spinner loading-sm"></span>
									Saving...
								{:else}
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
									Save Changes
								{/if}
							</button>
						</div>
					{/if}
				</div>
			</div>

			<!-- Security Settings -->
			<div class="card bg-base-200 shadow-xl">
				<div class="card-body">
					<h2 class="card-title mb-4">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							class="h-5 w-5"
						>
							<rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
							<path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
						</svg>
						Security
					</h2>

					<div class="space-y-4">
						<div class="bg-base-200 flex items-center justify-between rounded-lg p-4">
							<div class="flex-1">
								<h3 class="font-semibold">Password</h3>
								<p class="text-sm opacity-70">Last changed 3 months ago</p>
							</div>
							<button class="btn btn-outline btn-sm">Change Password</button>
						</div>

						<div class="bg-base-200 flex items-center justify-between rounded-lg p-4">
							<div class="flex-1">
								<h3 class="font-semibold">Two-Factor Authentication</h3>
								<p class="text-sm opacity-70">Add an extra layer of security</p>
							</div>
							<input type="checkbox" class="toggle toggle-primary" />
						</div>

						<div class="bg-base-200 flex items-center justify-between rounded-lg p-4">
							<div class="flex-1">
								<h3 class="font-semibold">Active Sessions</h3>
								<p class="text-sm opacity-70">Manage your logged-in devices</p>
							</div>
							<button class="btn btn-outline btn-sm">View All</button>
						</div>
					</div>
				</div>
			</div>

			<!-- Danger Zone -->
			<div class="card bg-base-100 border-error border-2 shadow-xl">
				<div class="card-body">
					<h2 class="card-title text-error">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							class="h-5 w-5"
						>
							<path
								d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
							></path>
							<line x1="12" y1="9" x2="12" y2="13"></line>
							<line x1="12" y1="17" x2="12.01" y2="17"></line>
						</svg>
						Danger Zone
					</h2>
					<p class="mb-4 opacity-70">
						Once you delete your account, there is no going back. Please be certain.
					</p>
					<button class="btn btn-error btn-outline"> Delete Account </button>
				</div>
			</div>
		</div>
	</div>
</div>
