import {http} from "../util/http";
import {securedHttp} from "../util/securedHttp";
import {Company} from "./company";

export interface AuthResponse {
    token: string;
    company: Company;
}

export interface AuthRequest {
    email: string;
    password: string;
}

export class AuthService {
    private static readonly BASE_URL = "/auth";

    static async authenticate(data: AuthRequest): Promise<AuthResponse> {
        return http.post<AuthResponse>(`${this.BASE_URL}`, data);
    }

    static async current(): Promise<AuthResponse> {
        return securedHttp.post<AuthResponse>(`${this.BASE_URL}/current`, undefined);
    }
}
