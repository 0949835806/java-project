import { Role } from "./role";

export class User {
    userid!: number;
    fullName!: string;
    username!: string;
    email!: string;
    phone!: string;
    address!:string;
    password!: string;
    enable!: boolean;
    role:Role[] = [];

}