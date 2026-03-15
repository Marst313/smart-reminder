import { writable } from 'svelte/store';

export interface User {
	id: number;
	name: string;
	email: string;
	phone: string;
	bio: string;
	avatar_url: string;
	created_at: string;
	updated_at: string;
}

export interface AuthState {
	user: User | null;
	isAuthenticated: boolean;
	isLoading: boolean;
}

function createAuthStore() {
	const { subscribe, set, update } = writable<AuthState>({
		user: null,
		isAuthenticated: false,
		isLoading: false
	});

	return {
		subscribe,

		setLoading: (isLoading: boolean) => {
			update((state) => ({
				...state,
				isLoading
			}));
		},

		setUser: (user: User | null) => {
			set({
				user,
				isAuthenticated: user ? true : false,
				isLoading: false
			});
		},

		logout: () => {
			// set({
			// 	user: null,
			// 	isAuthenticated: false,
			// 	isLoading: false
			// });
		}
	};
}

export const auth = createAuthStore();
