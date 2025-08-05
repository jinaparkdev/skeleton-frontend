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
                headers: { "Content-Type": "application/json", ...headers },
                body: body ? JSON.stringify(body) : undefined,
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                const errorText = await response.text();
                throw response.status === 401
                    ? new UnauthorizedError()
                    : new HttpError(errorText || "An error occurred", response.status);
            }

            return response.json();
        } finally {
            clearTimeout(timeoutId);
        }
    }

    private static async requestWithoutResponse(method: string, url: string, body?: any, headers: Record<string, string> = {}): Promise<void> {
        const fullUrl = url.startsWith("http") ? url : `${this.BASE_URL}${url}`;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.TIMEOUT);

        try {
            const response = await fetch(fullUrl, {
                method,
                headers: { "Content-Type": "application/json", ...headers },
                body: body ? JSON.stringify(body) : undefined,
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                const errorText = await response.text();
                throw response.status === 401
                    ? new UnauthorizedError()
                    : new HttpError(errorText || "An error occurred", response.status);
            }
        } finally {
            clearTimeout(timeoutId);
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

    static async head(url: string, headers: Record<string, string> = {}): Promise<boolean> {
        try {
            await this.requestWithoutResponse("HEAD", url, undefined, headers);
            return true;
        } catch (error) {
            if (error instanceof HttpError && error.status === 409) {
                return false;
            }
            throw error;
        }
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
    constructor(message: string = "로그인이 필요한 서비스입니다.") {
        super(message, 401);
    }
}
