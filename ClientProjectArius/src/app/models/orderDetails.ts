import { Orders } from "./orders";
import { Product } from "./product";

export class OrderDetails {
    idlineItem !: number;
    product:Product[] = [];
    price !: number;
    quantity !: number;
    orders:Orders[] = [];
}