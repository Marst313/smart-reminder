<script lang="ts">
	import { remindersStore, reminderUIStore } from '$lib/stores/reminder.store';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { SvelteURLSearchParams } from 'svelte/reactivity';

	interface Props {
		onPerPageChange: (perPage: number, total: number) => void;
	}

	let pagination = $derived($reminderUIStore.pagination);
	let { onPerPageChange }: Props = $props();

	function handleChangePage(type: 'prev' | 'next') {
		let newPage = type === 'prev' ? pagination.currentPage - 1 : pagination.currentPage + 1;
		const params = new SvelteURLSearchParams(page.url.searchParams);

		if (newPage > pagination.totalPage) {
			newPage = 1;
		}
		if (newPage < 1) {
			newPage = pagination.totalPage;
		}

		params.set('page', String(newPage));

		goto(resolve(String(`/reminders?${params.toString()}`) as '/reminders'));
	}

	function handleChangePerPage(perPage: number) {
		onPerPageChange(perPage, Number($remindersStore.total));

		const params = new SvelteURLSearchParams(page.url.searchParams);
		params.set('page', String(pagination.currentPage));
		params.set('limit', String(perPage));

		goto(resolve(String(`/reminders?${params.toString()}`) as '/reminders'));
	}

	function handleChangePageNumber(index: number) {
		reminderUIStore.updatePage(index + 1);

		const params = new SvelteURLSearchParams(page.url.searchParams);
		params.set('page', String(index + 1));
		params.set('limit', String(pagination.perPage));

		goto(resolve(String(`/reminders?${params.toString()}`) as '/reminders'));
	}
</script>

<div class="flex flex-col items-center justify-center gap-5">
	<div class="join flex w-full items-center justify-center gap-2">
		<button class="join-item btn hover:bg-primary" onclick={() => handleChangePage('prev')}
			>« Previous
		</button>

		{#each Array(pagination.totalPage) as _, i (i)}
			<button
				onclick={() => handleChangePageNumber(i)}
				class="join-item btn hover:bg-primary"
				class:bg-primary={i + 1 == pagination.currentPage}>{i + 1}</button
			>
		{/each}
		<button onclick={() => handleChangePage('next')} class="join-item btn hover:bg-primary">
			Next »</button
		>
	</div>

	<div>
		<label for="perPage">Per Page:</label>
		<select
			id="perPage"
			name="perPage"
			class="select w-40 bg-slate-800"
			onchange={(e) => handleChangePerPage(Number(e.currentTarget.value))}
			bind:value={pagination.perPage}
		>
			<option selected value={5}>5</option>
			<option value={10}>10</option>
			<option value={25}>25</option>
			<option value={50}>50</option>
			<option value={100}>100</option>
		</select>
	</div>
</div>
