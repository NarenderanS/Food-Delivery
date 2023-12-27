import { AppUser } from './appUser';
import { Product } from './product';

export interface Cart {
  id: number;
  userId: number;
  productId:number;
  productName: String;
  count: number;
  description: String;
  price: number;
  categoryId: number;
  restaurantId: number;
  restaurantName:String;
  vegOrNonVegId: number;
}
