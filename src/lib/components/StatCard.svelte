<script>
	export let title;
	export let value;
	export let icon;
</script>

<div class="card bg-base-100 shadow transition hover:shadow-lg">
	<div class="card-body">
		<div class="text-3xl">{icon}</div>
		<h2 class="text-sm opacity-70">{title}</h2>
		<p class="text-2xl font-bold">{value}</p>
	</div>
</div>
