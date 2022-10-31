import { Cart } from "./cart";
import { StatusOrder } from "./statusorder";
import { User } from "./user";

export class Orders{
    [x: string]: any;
    orderid !: number;
    fullName !:string;
    dateofset = new Date();
    delivery !: boolean;
    note !: string;
    user:User [] = [];
}