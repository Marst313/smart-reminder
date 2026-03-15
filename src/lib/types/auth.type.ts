import type { TReminder } from '$lib/stores/reminder.store';

export type TResponse = {
	data: any;
	message: string;
	status: string;
};

export type TUser = {
	id: number;
	name: string;
	email: string;
	phone: string;
	bio: string;
	avatar_url: string;
	created_at: string;
	updated_at: string;
};

export type TAuthResponse = TResponse & {
	data?: {
		token: string;
		user: TUser;
	};
};

export type TReminderResponse = TResponse & {
	data: TReminder[];
};
