import { fail } from '@sveltejs/kit';
import type { Actions } from './$types.js';
import { authApi } from '$lib/services/api.js';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const email = data.get('email') as string;
		const password = data.get('password') as string;
		const name = data.get('name') as string;

		if (!email || !password || !name) {
			return fail(400, {
				empty: true,
				success: false,
				message: 'Email, password, dan nama harus diisi'
			});
		}

		try {
			const result = await authApi.register({ email, password, name });

			return {
				success: true,
				status: 200,
				data: result
			};
		} catch (error: any) {
			return fail(500, {
				success: false,
				message: error.message || 'Registrasi gagal'
			});
		}
	}
} satisfies Actions;
