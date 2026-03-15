<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	let showToast = $state(false);
	let toastMessage = $state('');
	let toastType = $state<'success' | 'error'>('success');
	let isLoading = $state(false);

	function triggerToast(message: string, type: 'success' | 'error' = 'success') {
		toastMessage = message;
		toastType = type;
		showToast = true;

		setTimeout(() => {
			showToast = false;
		}, 3000);
	}

	function handleEnhance() {
		return async ({ result, update }: { result: any; update: any }) => {
			isLoading = false;

			if (result.type === 'success' && result.data?.success) {
				triggerToast('Registrasi berhasil! Silakan login.', 'success');
				goto(resolve('/login'));
			} else if (result.type === 'failure') {
				triggerToast(result.data?.message || 'Registrasi gagal', 'error');
			}

			await update();
		};
	}
</script>

<div class="bg-base-200 flex min-h-screen items-center justify-center">
	<div class="card bg-base-100 w-96 shadow-xl">
		<div class="card-body">
			<h2 class="card-title justify-center text-2xl font-bold">Register</h2>

			<form
				class="space-y-4"
				method="POST"
				use:enhance={handleEnhance}
				onsubmit={() => (isLoading = true)}
			>
				<div class="form-control">
					<label class="label" for="name">
						<span class="label-text">Name</span>
					</label>
					<input
						name="name"
						type="text"
						id="name"
						placeholder="Your Name"
						class="input input-bordered w-full"
						required
					/>
				</div>

				<div class="form-control">
					<label class="label" for="email">
						<span class="label-text">Email</span>
					</label>
					<input
						name="email"
						type="email"
						id="email"
						placeholder="email@example.com"
						class="input input-bordered w-full"
						required
					/>
				</div>

				<div class="form-control">
					<label class="label" for="password">
						<span class="label-text">Password</span>
					</label>
					<input
						name="password"
						type="password"
						id="password"
						placeholder="••••••••"
						class="input input-bordered w-full"
						required
					/>
				</div>

				<div class="form-control mt-6">
					<button type="submit" class="btn btn-primary w-full" disabled={isLoading}>
						{#if isLoading}
							<span class="loading loading-spinner loading-sm"></span>
							Registering...
						{:else}
							Register
						{/if}
					</button>
				</div>
			</form>

			<div class="divider">ATAU</div>

			<a href={resolve('/login')} class="link link-primary text-center">
				Sudah punya akun? Masuk di sini
			</a>

			{#if showToast}
				<div class="toast toast-top toast-end z-50">
					<div class={`alert ${toastType === 'success' ? 'alert-success' : 'alert-error'}`}>
						<span>{toastMessage}</span>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
