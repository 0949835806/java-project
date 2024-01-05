import { Role } from "./role";

export class User {
    userid!: number;
    username!: string;
    email!: string;
    password!: string;
    confirmPassword!:string;
    roleName!: string;
    role:Role[] = [];
}