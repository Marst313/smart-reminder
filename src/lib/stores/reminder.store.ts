import { writable } from 'svelte/store';

export type TReminder = {
	id: number;
	type: 'reminder' | 'success' | 'warning' | 'info' | 'error';
	title: string;
	description: string;
	date: string;
	time: string;
	read: boolean;
	category: string;
	priority: 'high' | 'medium' | 'low';
	recurring: boolean;
	is_completed: boolean;
	createdAt: string;
};

export type TDataReminder = {
	total?: number;
	upcoming?: number;
	late?: number;
	active?: number;
	completed?: number;
	isLoading: boolean;
	reminders: TReminder[];
};

export type TReminderUI = {
	// Modal states
	showModal: boolean;
	showDeleteModal: boolean;
	editingId: number;
	deletingId: number | null;
	reminderToDelete: TReminder | null;

	// Form fields
	form: {
		title: string;
		description: string;
		date: string;
		time: string;
		category: 'personal' | 'work' | 'health' | 'shopping' | 'other';
		priority: 'high' | 'medium' | 'low';
		recurring: boolean;
	};

	// Filter states
	filters: {
		status: string;
		priority: string;
		sortBy: string;
	};
};

function createReminderStore() {
	const { subscribe, update, set } = writable<TDataReminder>({
		isLoading: true,
		reminders: []
	});

	return {
		subscribe,
		update,
		set,

		setReminders: (dataReminder: TDataReminder) => {
			set({ ...dataReminder, isLoading: false });
		},

		setLoading: (loading: boolean) => {
			update((store) => ({ ...store, isLoading: loading }));
		},

		toggleComplete: (id: number) => {
			update((store) => {
				const updatedReminders = store.reminders.map((r) =>
					r.id === id ? { ...r, is_completed: !r.is_completed } : r
				);
				return {
					...store,
					reminders: updatedReminders,
					active: updatedReminders.filter((r) => !r.is_completed).length,
					completed: updatedReminders.filter((r) => r.is_completed).length
				};
			});
		},

		clear: () =>
			set({
				total: 0,
				upcoming: 0,
				late: 0,
				reminders: [],
				active: 0,
				isLoading: false,
				completed: 0
			})
	};
}

function createReminderUIStore() {
	const { subscribe, update, set } = writable<TReminderUI>({
		showModal: false,
		showDeleteModal: false,
		editingId: 0,
		deletingId: null,
		reminderToDelete: null,
		form: {
			title: '',
			description: '',
			date: '',
			time: '',
			category: 'personal',
			priority: 'medium',
			recurring: false
		},
		filters: {
			status: 'all',
			priority: 'all',
			sortBy: 'date'
		}
	});

	return {
		subscribe,
		update,
		set,

		// Modal actions
		openModal: (reminder?: TReminder) => {
			update((store) => {
				if (reminder) {
					return {
						...store,
						showModal: true,
						editingId: reminder.id,
						form: {
							title: reminder.title,
							description: reminder.description,
							date: reminder.date.split('T')[0],
							time: reminder.time.split('T')[1].substring(0, 5),
							category: reminder.category as any,
							priority: reminder.priority,
							recurring: reminder.recurring
						}
					};
				} else {
					return {
						...store,
						showModal: true,
						editingId: 0,
						form: {
							title: '',
							description: '',
							date: '',
							time: '',
							category: 'personal',
							priority: 'medium',
							recurring: false
						}
					};
				}
			});
		},

		closeModal: () => {
			update((store) => ({
				...store,
				showModal: false,
				editingId: 0
			}));
		},

		openDeleteModal: (reminder: TReminder) => {
			update((store) => ({
				...store,
				showDeleteModal: true,
				reminderToDelete: reminder
			}));
		},

		closeDeleteModal: () => {
			update((store) => ({
				...store,
				showDeleteModal: false,
				reminderToDelete: null,
				deletingId: null
			}));
		},

		setDeletingId: (id: number | null) => {
			update((store) => ({
				...store,
				deletingId: id
			}));
		},

		// Form actions
		updateForm: (field: keyof TReminderUI['form'], value: any) => {
			update((store) => ({
				...store,
				form: {
					...store.form,
					[field]: value
				}
			}));
		},

		// Filter actions
		updateFilter: (field: keyof TReminderUI['filters'], value: string) => {
			update((store) => ({
				...store,
				filters: {
					...store.filters,
					[field]: value
				}
			}));
		},

		reset: () => {
			set({
				showModal: false,
				showDeleteModal: false,
				editingId: 0,
				deletingId: null,
				reminderToDelete: null,
				form: {
					title: '',
					description: '',
					date: '',
					time: '',
					category: 'personal',
					priority: 'medium',
					recurring: false
				},
				filters: {
					status: 'all',
					priority: 'all',
					sortBy: 'date'
				}
			});
		}
	};
}

export const remindersStore = createReminderStore();
export const reminderUIStore = createReminderUIStore();
