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

    static async singIn(data: AuthRequest): Promise<AuthResponse> {
        return http.post<AuthResponse>(`/signin`, data);
    }

    static async current(): Promise<AuthResponse> {
        return securedHttp.post<AuthResponse>(`/current`, undefined);
    }

    static async signOut(): Promise<void> {
        return securedHttp.post<void>(`/signout`, undefined);
    }
}
