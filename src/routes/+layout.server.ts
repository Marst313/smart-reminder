import { fail } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { authApi } from '$lib/services/api';
import type { TAuthResponse } from '$lib/types/auth.type';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const token = cookies.get('token') || '';

	if (!token) return {};

	try {
		const result: TAuthResponse = await authApi.refreshCookies(token);

		return {
			success: true,
			user: result?.data?.user
		};
	} catch (error: any) {
		console.log(error);

		return fail(500, {
			success: false,
			message: error.message || 'Internal server error'
		});
	}
};
