import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { toISOWithJakartaOffset } from '$lib/utils/date';
import { reminderApi } from '$lib/services/api';

export const actions: Actions = {
	create: async ({ request, cookies }) => {
		const data = await request.formData();

		const rawDate = data.get('date') as string;
		const rawTime = data.get('time') as string;

		const { date, time } = toISOWithJakartaOffset(rawDate, rawTime);

		const payload = {
			title: data.get('title'),
			description: data.get('description'),
			date,
			time,
			category: data.get('category'),
			priority: data.get('priority'),
			recurring: data.get('recurring') === 'on',
			is_completed: false
		};

		const token = cookies.get('token') || '';

		try {
			await reminderApi.create(token, payload);

			return { success: true };
		} catch (e) {
			return fail(400, {
				error: 'Failed create reminder',
				message: (e as any).message || 'An error occurred'
			});
		}
	},
	update: async ({ request, cookies }) => {
		const data = await request.formData();

		const rawDate = data.get('date') as string;
		const rawTime = data.get('time') as string;

		const { date, time } = toISOWithJakartaOffset(rawDate, rawTime);

		const payload = {
			title: data.get('title'),
			description: data.get('description'),
			date,
			time,
			category: data.get('category'),
			priority: data.get('priority'),
			recurring: data.get('recurring') === 'on',
			is_completed: false
		};

		const token = cookies.get('token') || '';

		try {
			await reminderApi.update(token, Number(data.get('id')), payload);

			return { success: true };
		} catch (e) {
			return fail(400, {
				error: 'Failed create reminder',
				message: (e as any).message || 'An error occurred'
			});
		}
	},
	delete: async ({ cookies, request }) => {
		const token = cookies.get('token') || '';
		const formData = await request.formData();
		const id = formData.get('id');

		if (!id) {
			return fail(400, { message: 'Reminder ID is required' });
		}

		try {
			await reminderApi.delete(token, Number(id));

			return {
				success: true,
				message: 'Reminder deleted successfully'
			};
		} catch (error) {
			console.error('Delete error:', error);
			return fail(500, {
				message: 'Failed to delete reminder',
				error: error instanceof Error ? error.message : 'Unknown error'
			});
		}
	},
	toggleComplete: async ({ cookies, request }) => {
		const token = cookies.get('token') || '';
		const formData = await request.formData();

		const isCompleted = formData.get('is_completed') as string;

		try {
			await reminderApi.toggleComplete(token, Number(formData.get('id')), isCompleted);

			return {
				success: true,
				message: 'Reminder completion toggled successfully'
			};
		} catch (error) {
			console.error('Toggle completion error:', error);
			return fail(500, {
				message: 'Failed to toggle reminder completion',
				error: error instanceof Error ? error.message : 'Unknown error'
			});
		}
	}
};
