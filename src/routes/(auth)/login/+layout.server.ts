import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, locals }) => {
	// Jika ada token di cookie, return user data
	// User data bisa dari locals (sudah di-set di hooks)

	console.log(cookies);
	return {
		user: locals.user || null
	};
};
