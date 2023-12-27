import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Cart } from '../model/cart';
import { AppResponse } from '../model/appResponse';
import { urlEndpoint } from '../utils/constant';
import { Observable } from 'rxjs';
import { AppUser } from '../model/appUser';
import { StorageService } from './storage.service';
import { Product } from '../model/product';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class CartService implements OnInit {
  userCart: Cart[] = [];
  products: Product[] = [];
  user: AppUser = this.storageService.getLoggedInUser();
  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private productService: ProductService
  ) {
    // console.log(productService.loadProducts());
    this.productService.getAllProducts().subscribe({
      next: (response: any) => {
        let products: Product[] = response.data;
        if (products.length > 0) {
          this.products = products;
        }
      },
    });
  }
  ngOnInit(): void {
    this.getUserCart(this.user.id).subscribe({
      next: (response: AppResponse) => {
        console.log(response.data);
        this.userCart = response.data;
      },
    });
  }
  getUserCart(userId: number): Observable<AppResponse> {
    return this.http.get<AppResponse>(
      `${urlEndpoint.baseUrl}/user/cart/${userId}`
    );
  }
  addToCart(item: {
    userId: number;
    productId: number;
    count: number;
  }): Observable<AppResponse> {
    return this.http.post<AppResponse>(
      `${urlEndpoint.baseUrl}/user/cart/add`,
      item
    );
  }
  deleteFromCart(cartProductId: number): Observable<AppResponse> {
    return this.http.delete<AppResponse>(
      `${urlEndpoint.baseUrl}/user/cart/delete/${this.user.id}/${cartProductId}`
    );
  }

  loadUserCart(userId: number): Cart[] {
    this.getUserCart(this.user.id).subscribe({
      next: (response: AppResponse) => {
        this.userCart = response.data;
      },
    });
    return this.userCart;
  }
  getProductCount(productId: number): number {
    // let product=this.userCart.find((product)=>product.id===productId)
    // console.log(product?.price )
    // console.log(this.products)
    for (let i of this.userCart) {
      if (i.productId === productId) {
        return i.count;
      }
    }
    return 0;
  }
  getCartCount(): number {
    let count = 0;
    for (let i of this.userCart) {
      count += i.count;
    }

    return count;
  }
}
