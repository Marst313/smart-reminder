import type { TAuthResponse, TReminderResponse } from '$lib/types/auth.type';
import { api } from '$lib/utils/api-helper';

// Auth APIs
export const authApi = {
	login: (data: { email: string; password: string }) => {
		const result: Promise<TAuthResponse> = api.post('auth/login', data);

		return result;
	},

	register: (data: { email: string; password: string; name: string }) =>
		api.post('auth/register', data),

	logout: (token: string) => api.post('auth/logout', {}, token),

	refreshCookies: (token: string): Promise<TAuthResponse> => api.get('auth/refresh-cookies', token)
};

// Reminder APIs
export const reminderApi = {
	getAll: (token: string): Promise<TReminderResponse> => api.get('reminders', token),

	getById: (token: string, id: number) => api.get(`reminders/${id}`, token),

	create: (token: string, data: any) => api.post('reminders', data, token),

	update: (token: string, id: number, data: any) => {
		return api.patch(`reminders/${id}`, data, token);
	},

	delete: (token: string, id: number) => api.delete(`reminders/${id}`, token),

	toggleComplete: (token: string, id: number, data: string) => {
		const boolValue = data === 'true' ? false : true;

		return api.patch(`reminders/${id}/toggle-complete`, { is_completed: boolValue }, token);
	}
};
