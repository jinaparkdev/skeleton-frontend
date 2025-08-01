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

export interface AuthenticateCompanyRequest {
    email: string;
    password: string;
}

export interface AuthenticateCompanyResponse {
    token: string;
    company: Company;
}

export class CompanyService {
    private static readonly BASE_URL = '/company';

    static async create(data: CreateCompanyRequest): Promise<Company> {
        return http.post<Company>(this.BASE_URL, data);
    }

    static async authenticate(data: AuthenticateCompanyRequest): Promise<AuthenticateCompanyResponse> {
        return http.post<AuthenticateCompanyResponse>(`${this.BASE_URL}/auth`, data);
    }
}
