import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppResponse } from 'src/app/model/appResponse';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';
import { StorageService } from 'src/app/service/storage.service';
import { CONSTANT } from 'src/app/utils/constant';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
})
export class CategoryComponent {
  count = 0;
  products: any = [];
  restId=0;
  id = parseInt(this.router.url.split('/')[2]);
  constructor(private productService: ProductService, private router: Router,private storageService:StorageService) {
    productService.getCategoryProducts(this.id).subscribe({
      next: (response: any) => {
        let product: Product = response.data;
        console.log(product);
        this.products = product;
      },
    });
  }
  
  productDetails(id: number): void {
    this.productService.productDetails(id);
    this.router.navigate(['product', id]);
  }
  getProductCount(id: number): number {
    return 0;
  }
  addToCart(id: number, operator = '+'): void {}
  // product
  deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe({
      next: (response: AppResponse) => {
        this.products = response.data;
      },
    });
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
downloadProductPhoto(productId: number): any {
  return this.productService.downloadPhoto(productId);
}
isLoggedIn(): boolean {
  return this.storageService.isUserLoggedIn();
}
}
