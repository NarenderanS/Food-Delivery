import { Address } from "./address";
import { Cart } from "./cart";

export interface Order {
    id:number
    title:String
    orderedProducts:Cart[];
    userId:number;
    name:String;
    username:String;
    address:Address;
    orderStatus:String;
}
