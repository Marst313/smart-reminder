import { fail } from '@sveltejs/kit';
import type { Actions } from './$types.js';
import { authApi } from '$lib/services/api.js';
import type { TAuthResponse } from '$lib/types/auth.type.js';

export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		const email = data.get('email') as string;
		const password = data.get('password') as string;

		if (!email || !password) {
			return fail(400, {
				success: false,
				message: 'Email dan password harus diisi'
			});
		}

		try {
			const result: TAuthResponse = await authApi.login({ email, password });

			if (result.data?.token) {
				cookies.set('token', result.data?.token, {
					path: '/',
					httpOnly: true,
					secure: process.env.NODE_ENV === 'production',
					sameSite: 'strict',
					maxAge: 60 * 60 * 24 * 7
				});
			}

			return {
				success: true,
				user: result?.data?.user
			};
		} catch (error: any) {
			return fail(401, {
				success: false,
				message: error.message || 'Email atau password salah'
			});
		}
	}
} satisfies Actions;
