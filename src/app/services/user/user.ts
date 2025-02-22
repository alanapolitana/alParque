export interface User {
image: any;
    id: number;
    email?: string;
    first_name?: string;
    last_name?: string;
    address: string;
    phone: number;
    password: string;
    confirmPassword: string;
}