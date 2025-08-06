import {http} from "../util/http";

export interface Company {
    id: number;
    name: string;
    email: string;
    phone: string;
}

export interface CreateCompanyRequest {
    name: string;
    email: string;
    password: string;
    phone: string;
}

export class CompanyService {
    private static readonly BASE_URL = "/company";

    static async create(data: CreateCompanyRequest): Promise<Company> {
        return http.post<Company>(this.BASE_URL, data);
    }

    static async isAvailablePhone(phone: string): Promise<boolean> {
        return http.head(`${this.BASE_URL}/availability/phone/${encodeURIComponent(phone)}`)
    }

    static async isAvailableEmail(email: string): Promise<boolean> {
        return http.head(`${this.BASE_URL}/availability/email/${encodeURIComponent(email)}`)
    }

    static async sendResetPasswordEmail(email: string): Promise<void> {
        return http.postWithoutResponse(`${this.BASE_URL}/recovery/password`, {email});
    }

    static async resetPassword(token: string, password: string): Promise<void> {
        return http.putWithoutResponse(`${this.BASE_URL}/recovery/password/${token}`, {password});
    }
}
