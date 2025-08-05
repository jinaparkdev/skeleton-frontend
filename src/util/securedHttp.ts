import {http} from "./http";

export class securedHttp {
    private static addAuthHeader(headers: Record<string, string>): Record<string, string> {
        //TODO 토큰 키 값 환경변수로 관리
        return {...headers, Authorization: `Bearer ${localStorage.getItem("hubt.login.token")}`};
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

    static head(url: string, headers: Record<string, string> = {}): Promise<boolean> {
        return http.head(url, this.addAuthHeader(headers));
    }
}
