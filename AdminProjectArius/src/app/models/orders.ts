import { Address } from "./address";
import { Cart } from "./cart";
import { LineItems } from "./lineItems";
import { StatusOrder } from "./statusorder";
import { User } from "./user";

export class Orders{
    [x: string]: any;
    orderid !: number;
    paymentMethod !:string;
    totalPrice!: number;
    updateDate = new Date();
    address: Address[] = [];
    user:User [] = [];
    lineItems: LineItems[] = [];
}