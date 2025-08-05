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
        return http.head(`${this.BASE_URL}/available/phone/${encodeURIComponent(phone)}`)
    }

    static async isAvailableEmail(email: string): Promise<boolean> {
        return http.head(`${this.BASE_URL}/available/email/${encodeURIComponent(email)}`)
    }
}
