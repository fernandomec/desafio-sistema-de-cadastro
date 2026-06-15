const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

async function request<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const token = localStorage.getItem('token');

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    if (options.headers) {
        Object.assign(headers, options.headers);
    }

    // 4. Fazemos a requisição
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: headers,
    });

    const data = await res.json();

    if (!res.ok) {
        throw data;
    }

    return data as T;
}

export const api = {
    post: <T>(endpoint: string, body: unknown) =>
        request<T>(endpoint, { method: 'POST', body: JSON.stringify(body) }),

    get: <T>(endpoint: string) =>
        request<T>(endpoint, { method: 'GET' }),
};