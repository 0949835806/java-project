import { Category } from "./category";

export class Product{
    [x: string]: any;
    proId!: string;
    proName!: string;
    price!: number;
    sale_price!: number;
    description!: string;
    image!: string;
    status!: boolean;
}