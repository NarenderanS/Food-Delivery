import { Address } from './address';
import { Cart } from './cart';
import { Order } from './order';

export interface AppUser {
  id: number;
  name: String;
  userName: String;
  role: String;
  cartList: Cart[];
  orderList: Order[];
  gender: String;
  phoneNo: String;
  addressList: Address[];
  restaurantId: number;
}
