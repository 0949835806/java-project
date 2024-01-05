import { User } from "./user";

export class Address {
    id!: number;
    fullName!: string;
    name!: string;
    landmark!: string;
    mobileNo!: string;
    houseNo!:string;
    street!: string;
    postalCode!: number;
    user:User[] = [];
}
