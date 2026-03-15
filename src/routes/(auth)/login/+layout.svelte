<script lang="ts">
	import { auth } from '$lib/stores/auth.store.js';
	import { onMount } from 'svelte';

	let { data, children } = $props();

	onMount(() => {
		if (data.user) {
			auth.setUser(data.user);
		}
	});
</script>

{@render children()}
