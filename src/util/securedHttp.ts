import {http} from "./http";

export class SecuredHttp {
    private static addAuthHeader(headers: Record<string, string>): Record<string, string> {
        return {...headers, Authorization: `Bearer ${localStorage.getItem("token")}`};
    }

    static get<T>(url: string, headers: Record<string, string> = {}): Promise<T> {
        return http.get<T>(url, this.addAuthHeader(headers));
    }

    static post<T>(url: string, body: any, headers: Record<string, string> = {}): Promise<T> {
        return http.post<T>(url, body, this.addAuthHeader(headers));
    }

    static put<T>(url: string, body: any, headers: Record<string, string> = {}): Promise<T> {
        return http.put<T>(url, body, this.addAuthHeader(headers));
    }

    static delete<T>(url: string, headers: Record<string, string> = {}): Promise<T> {
        return http.delete<T>(url, this.addAuthHeader(headers));
    }
}
