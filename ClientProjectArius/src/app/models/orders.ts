import { Cart } from "./cart";
import { User } from "./user";

export class Orders {
    orderid !: number;
    dateofset = new Date();
    total !: number;
    note !: string;
    user:User[] = [];
    cart:Cart[] = [];
}