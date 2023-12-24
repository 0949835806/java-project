import { Category } from "./category";
import { ImageProduct } from "./imageProduct";

export class Product{
    [x: string]: any;
    proId!: string;
    proName!: string;
    price!: number;
    sale_price!: number;
    color!:string;
    size!:string;
    offer!: string;
    description!: string;
    image!: string;
    status!: boolean;
    carouselImages: Array<ImageProduct>=[];
}