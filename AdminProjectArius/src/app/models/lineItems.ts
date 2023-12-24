import { Category } from "./category";
import { ImageProduct } from "./imageProduct";

export class LineItems {
    idlineItem!: number;
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
    quantity!: number;
    cate: Category[]= [];
}