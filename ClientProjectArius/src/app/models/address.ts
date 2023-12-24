import { User } from "./user";

export class Address {
    id!: number;
    fullName!: string;
    name!: string;
    landmark!: string;
    phone!: string;
    houseNo!:string;
    street!: string;
    postalCode!: number;
    user:User[] = [];
}
