import { reminderApi } from '$lib/services/api';
import type { TReminder } from '$lib/stores/reminder.store';
import { isAfter, isBefore, parseISO } from 'date-fns';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ url, cookies }) => {
	const token = cookies.get('token') || '';
	const page = Number(url.searchParams.get('page') || 1);
	const limit = Number(url.searchParams.get('limit') || 10);

	const offset = (page - 1) * limit;

	const result = await reminderApi.getAll(token, { limit, offset });

	const reminders = result.data.reminders;

	const now = new Date();

	const upcoming = reminders.filter((r: any) => {
		const combined = `${r.date.split('T')[0]}T${r.time.split('T')[1]}`;
		const reminderDate = parseISO(combined);

		return isAfter(reminderDate, now) && !r.is_completed;
	});

	const late = reminders.filter((r: any) => {
		const combined = `${r.date.split('T')[0]}T${r.time.split('T')[1]}`;
		const reminderDate = parseISO(combined);

		return isBefore(reminderDate, now) && !r.is_completed;
	});

	const completed = reminders.filter((r: TReminder) => r.is_completed === true).length;

	return {
		total: result.data.total,
		upcoming: upcoming.length,
		active: result.data.active,
		late: late.length,
		completed: completed,
		isLoading: false,
		reminders
	};
};
