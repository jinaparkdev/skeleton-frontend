export class http {
    private static readonly BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
    private static readonly TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 5000;

    private static async request<T>(method: string, url: string, body?: any, headers: Record<string, string> = {}): Promise<T> {
        const fullUrl = url.startsWith("http") ? url : `${this.BASE_URL}${url}`;

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.TIMEOUT);

        try {
            const response = await fetch(fullUrl, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    ...headers,
                },
                body: body ? JSON.stringify(body) : undefined,
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                if (response.status === 401) {
                    throw new UnauthorizedError();
                }

                const errorText = await response.text();
                throw new HttpError(errorText || "An error occurred", response.status);
            }

            return response.json();
        } catch (error) {
            clearTimeout(timeoutId);
            throw error;
        }
    }

    static get<T>(url: string, headers: Record<string, string> = {}): Promise<T> {
        return this.request<T>("GET", url, undefined, headers);
    }

    static post<T>(url: string, body: any, headers: Record<string, string> = {}): Promise<T> {
        return this.request<T>("POST", url, body, headers);
    }

    static put<T>(url: string, body: any, headers: Record<string, string> = {}): Promise<T> {
        return this.request<T>("PUT", url, body, headers);
    }

    static delete<T>(url: string, headers: Record<string, string> = {}): Promise<T> {
        return this.request<T>("DELETE", url, undefined, headers);
    }
}

export class HttpError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}

export class UnauthorizedError extends HttpError {
    constructor(message: string = "Unauthorized access. Please log in again.") {
        super(message, 401);
    }
}
