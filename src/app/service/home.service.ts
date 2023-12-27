import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { urlEndpoint } from '../utils/constant';
import { AppResponse } from '../model/appResponse';
import { CartService } from './cart.service';
import { ProductService } from './product.service';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  error: String = '';
  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private productService: ProductService
  ) {}

  getAllProducts(): Product[] {
    return this.productService.loadProducts();
    // this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/product/all`).subscribe({
    //   next: (response) => {
    //     console.log(response.data);
    //     return response;
    //   },
    //   error: (err) => {
    //     let message: String = err.error.error.message;
    //     this.error = message.includes(',') ? message.split(',')[0] : message;
    //   },
    // });
  }
  // getProductCount(productId: number): number {
  //   return this.cartService.getProductCount(productId);
  // }
  // addToCart(id: number, operator = '+'): void {
  //   this.cartService.addToCart(id, operator);
  // }
}
