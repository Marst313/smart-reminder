import { redirect } from '@sveltejs/kit';

export async function POST({ cookies }) {
	cookies.delete('token', {
		path: '/'
	});

	throw redirect(302, '/login');
}
