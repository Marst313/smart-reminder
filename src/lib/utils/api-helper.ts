import axios from 'axios';
import { PUBLIC_BASE_URL } from '$env/static/public';

const BASE_URL = PUBLIC_BASE_URL;

interface ApiError {
	message: string;
	code: number;
	raw?: any;
}

// Generic error handler
const handleError = (err: any): ApiError => {
	const apiError = err?.response?.data;

	return {
		message: apiError?.message || err.message || 'An error occurred',
		code: apiError?.error?.code || err?.response?.status || 500,
		raw: apiError
	};
};

// Generic request wrapper
async function request<T>(
	method: 'get' | 'post' | 'put' | 'delete' | 'patch',
	url: string,
	options?: {
		data?: any;
		token?: string;
		params?: any;
	}
): Promise<T> {
	try {
		const headers: any = {
			'Content-Type': 'application/json'
		};

		if (options?.token) {
			headers.Authorization = `Bearer ${options.token}`;
		}

		const response = await axios({
			method,
			url: `${BASE_URL}${url}`,
			data: options?.data,
			params: options?.params,
			headers
		});

		return response.data;
	} catch (err: any) {
		throw handleError(err);
	}
}

// Export helper functions
export const api = {
	get: <T>(url: string, token?: string, params?: any) => request<T>('get', url, { token, params }),

	post: <T>(url: string, data?: any, token?: string) => request<T>('post', url, { data, token }),

	put: <T>(url: string, data?: any, token?: string) => request<T>('put', url, { data, token }),

	patch: <T>(url: string, data?: any, token?: string) => request<T>('patch', url, { data, token }),

	delete: <T>(url: string, token?: string) => request<T>('delete', url, { token })
};
