<script>
	import '../app.css';

	import { auth } from '$lib/stores/auth.store';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	export let data;

	$: if (data?.user) {
		auth.setUser(data.user);
	}

	onMount(() => {
		if (!$auth.isAuthenticated) {
			goto(resolve('/login'));
		}
	});
</script>

<slot />
