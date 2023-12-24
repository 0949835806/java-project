import { User } from "./user";

export class Address {
    id!: number;
    name!: string;
    fullName!: string;
    mobileNo!: string;
    houseNo!: string;
    street!: string;
    landmark!: string;
    postalCode!: number;
    user: User [] = [];
}