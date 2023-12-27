import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppResponse } from 'src/app/model/appResponse';
import { AppUser } from 'src/app/model/appUser';
import { Cart } from 'src/app/model/cart';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';
import { StorageService } from 'src/app/service/storage.service';
import { CONSTANT } from 'src/app/utils/constant';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
})
export class ProductComponent {
  product: any = [];
  userCart: Cart[] = [];
  count = 0;
  id = parseInt(this.router.url.split('/')[2]);
  userDetail: AppUser = this.storageService.getLoggedInUser();
  
  constructor(
    private router: Router,
    private storageService: StorageService,
    private productService: ProductService,
    private cartService:CartService
  ) {
    this.productService.productDetails(this.id).subscribe({
      next: (response: any) => {
        let product: Product = response.data;
        console.log(product);

        this.product = product;
      },
    });
  }
  isLoggedIn(): boolean {
    return this.storageService.isUserLoggedIn();
  }
  user(): boolean {
    if (this.storageService.getLoggedInUser().role === CONSTANT.USER)
      return true;
    return false;
  }
  admin(): boolean {
    if (this.storageService.getLoggedInUser().role === CONSTANT.ADMIN)
      return true;
    return false;
  }
  restaurant(): boolean {
    if (this.storageService.getLoggedInUser().role === CONSTANT.RESTAURANT)
      return true;
    return false;
  }

  addToCart(id: number, operator = '+'): void {
    let count = 1;
    let cartProduct: Cart | undefined = this.userCart.find(
      (cartProduct) => cartProduct.productId === id
    );
    if (cartProduct) {
      if (operator === '+') {
        count = cartProduct.count + 1;
      } else {
        if (cartProduct.count - 1 === 0) {
          this.cartService.deleteFromCart(cartProduct.id).subscribe({
            next: (response: AppResponse) => {
              this.userCart = response.data;
              return;
            },
          });
        } else {
          count = cartProduct.count - 1;
        }
      }
    }
    let item = { userId: this.userDetail.id, productId: id, count: count };
    this.cartService.addToCart(item).subscribe({
      next: (response: AppResponse) => {
        this.userCart = response.data;
      },
    });
  }
  getProductCount(id: number): number {
    // this.count = this.productService.getProductCount(id);
    return this.count;
  }
  downloadProductPhoto(productId: number): any {
    return this.productService.downloadPhoto(productId);
  }
  
}
