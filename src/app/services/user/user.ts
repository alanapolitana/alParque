export interface User {
    image: string;
    id: number;
    email?: string;
    first_name?: string;
    last_name?: string;

    phone: number;
    password: string;
    confirmPassword: string;
    gender?: string; // Agregar el campo de género

}