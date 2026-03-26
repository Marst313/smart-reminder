<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { auth } from '$lib/stores/auth.store.js';
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';

	let { form } = $props();

	function handleEnhance() {
		auth.setLoading(true);

		return async ({ result, update }: { result: any; update: any }) => {
			if (result.type === 'success' && result.data?.user) {
				auth.setUser(result.data.user);

				setTimeout(() => {
					goto(resolve('/dashboard'));
				}, 500);
			}

			await update();
			auth.setLoading(false);
		};
	}

	onMount(() => {
		if ($auth.isAuthenticated) {
			goto(resolve('/dashboard'));
		}
	});
</script>

<div class="bg-base-200 flex min-h-screen items-center justify-center">
	<div class="card bg-base-100 w-96 shadow-xl">
		<div class="card-body">
			<h2 class="card-title justify-center text-2xl font-bold">Login</h2>

			{#if form?.message}
				<div class="alert alert-error">
					<span>{form?.message}</span>
				</div>
			{/if}

			<form class="space-y-4" method="POST" use:enhance={handleEnhance}>
				<div class="form-control">
					<label class="label" for="email">
						<span class="label-text">Email</span>
					</label>
					<input
						name="email"
						required
						type="email"
						id="email"
						placeholder="email@example.com"
						class="input input-bordered w-full"
					/>
				</div>

				<div class="form-control">
					<label class="label" for="password">
						<span class="label-text">Password</span>
					</label>
					<input
						name="password"
						required
						type="password"
						id="password"
						placeholder="••••••••"
						class="input input-bordered w-full"
					/>
				</div>

				<div class="form-control mt-6">
					<button type="submit" class="btn btn-primary w-full" disabled={$auth.isLoading}>
						{#if $auth.isLoading}
							<span class="loading loading-spinner loading-sm"></span>
							Logging in...
						{:else}
							Login
						{/if}
					</button>
				</div>
			</form>
		</div>
	</div>
</div>
