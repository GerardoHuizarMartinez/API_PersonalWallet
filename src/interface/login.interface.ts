
export interface Login {
    idLogin?: number; // opcional
    email: string;
    passwordUsr: string;
    lastConnection?: Date;
    registrationDate?: Date;
    fk_idUser:number;
}