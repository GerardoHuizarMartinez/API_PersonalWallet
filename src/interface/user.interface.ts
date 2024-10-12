
export interface User {
    idUser?: number; // opcional
    name: string;
    lastname: string;
    birthday? : Date;
    gender: string;
    telephone? : string;
    country?: string;
    postalCode?: number;
    state?:string;
    municipality?: string;
    colony?:string;
    address?: string;
    urlImage?:string;
    registrationDate: Date;
    password: String;
    email: String;
} 