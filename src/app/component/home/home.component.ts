import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppResponse } from 'src/app/model/appResponse';
import { AppUser } from 'src/app/model/appUser';
import { Cart } from 'src/app/model/cart';
import { Category } from 'src/app/model/category';
import { Product } from 'src/app/model/product';
import { Restaurant } from 'src/app/model/restaurant';
import { CartService } from 'src/app/service/cart.service';
import { CategoryService } from 'src/app/service/category.service';
import { HomeService } from 'src/app/service/home.service';
import { ProductService } from 'src/app/service/product.service';
import { RestaurantService } from 'src/app/service/restaurant.service';
import { StorageService } from 'src/app/service/storage.service';
import { CONSTANT } from 'src/app/utils/constant';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  restaurants: Restaurant[] = [];
  userCart: Cart[] = [];
  count = 0;
  user: AppUser = this.storageService.getLoggedInUser();
  constructor(
    private homeService: HomeService,
    private productService: ProductService,
    private categoryService: CategoryService,
    private restaurantService: RestaurantService,
    private cartService: CartService,
    private storageService: StorageService,
    private router: Router
  ) {
    this.products = homeService.getAllProducts();
    this.userCart = cartService.loadUserCart(this.user.id);
  }
  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (response: any) => {
        let products: Product[] = response.data;
        if (products.length > 0) {
          this.products = products;
        }
      },
    });
    this.categoryService.getAllCategory().subscribe({
      next: (response: any) => {
        let categories: Category[] = response.data;
        if (categories.length > 0) {
          this.categories = categories;
        }
      },
    });
    this.restaurantService.getAllRestaurant().subscribe({
      next: (response: any) => {
        let restaurants: Restaurant[] = response.data;
        if (restaurants.length > 0) {
          this.restaurants = restaurants;
        }
      },
    });
    this.cartService.getUserCart(this.user.id).subscribe({
      next: (response: AppResponse) => {
        this.userCart = response.data;
      },
    });
  }
  productDetails(id: number): void {
    this.productService.productDetails(id);
    this.router.navigate(['product', id]);
  }
  restaurantDetails(id: number): void {
    this.productService.productDetails(id);
    this.router.navigate(['restaurant', id]);
  }
  categoryProducts(id: number): void {
    this.productService.productDetails(id);
    this.router.navigate(['category', id]);
  }
  getProductCount(productId: number): number {
    let cartProduct = this.userCart.find(
      (product) => product.productId === productId
    );
    if (cartProduct?.count! > 0) {
      return cartProduct?.count!;
    }
    return 0;
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
    let item = { userId: this.user.id, productId: id, count: count };
    this.cartService.addToCart(item).subscribe({
      next: (response: AppResponse) => {
        this.userCart = response.data;
      },
    });
  }
  downloadProductPhoto(productId: number): any {
    return this.productService.downloadPhoto(productId);
  }
  downloadCategoryPhoto(categoryId: number): any {
    return this.categoryService.downloadPhoto(categoryId);
  }
  downloadRestaurantPhoto(restaurantId: number): any {
    return this.restaurantService.downloadRestaurantPhoto(restaurantId);
  }
  isLoggedIn(): boolean {
    return this.storageService.isUserLoggedIn();
  }
  isUser(): boolean {
    if (this.storageService.getLoggedInUser().role === CONSTANT.USER)
      return true;
    return false;
  }

}
