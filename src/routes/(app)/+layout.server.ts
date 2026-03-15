import { reminderApi } from '$lib/services/api';
import type { TReminder } from '$lib/stores/reminder.store';
import { isAfter, isBefore, parseISO } from 'date-fns';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const token = cookies.get('token') || '';
	const result = await reminderApi.getAll(token);

	const reminders = result.data.data;

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

	const active = reminders.filter((r: TReminder) => r.is_completed === false).length;
	const completed = reminders.filter((r: TReminder) => r.is_completed === true).length;

	return {
		total: reminders.length,
		upcoming: upcoming.length,
		active: active,
		late: late.length,
		completed: completed,
		isLoading: false,
		reminders
	};
};
