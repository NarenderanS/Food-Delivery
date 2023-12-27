import { Component } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppResponse } from 'src/app/model/appResponse';
import { Category } from 'src/app/model/category';
import { Product } from 'src/app/model/product';
import { Restaurant } from 'src/app/model/restaurant';
import { UserDetails } from 'src/app/model/user-details';
import { AuthService } from 'src/app/service/auth.service';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';
import { RestaurantService } from 'src/app/service/restaurant.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-delivery-history',
  templateUrl: './delivery-history.component.html',
})
export class DeliveryHistoryComponent {
  products: Product[] = [];
  categories: Category[] = [];
  restaurants: Restaurant[] = [];
  count = 0;
  editCategoryId = 0;
  categoryText = 'Add';
  restaurantText = 'Add';

  id = parseInt(this.router.url.split('/')[2]);
  constructor(
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService,
    private productService: ProductService,
    private categoryService: CategoryService,
    private restaurantService: RestaurantService
  ) {}
  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (response: any) => {
        let products: Product[] = response.data;
        console.log(response.data[0]);
        if (products.length > 0) {
          this.products = products;
        }
      },
    });
    this.categoryService.getAllCategory().subscribe({
      next: (response: any) => {
        let categories: Category[] = response.data;
        console.log(categories);
        if (categories.length > 0) {
          this.categories = categories;
        }
      },
    });
    this.restaurantService.getAllRestaurant().subscribe({
      next: (response: any) => {
        let restaurants: Restaurant[] = response.data;
        console.log(restaurants);
        if (restaurants.length > 0) {
          this.restaurants = restaurants;
        }
      },
    });
  }

  // restaurant
  registerRestaurant(restaurantForm: NgForm): void {
    console.log(restaurantForm.value)
    let restaurant: Restaurant = {
      id:0,
      title: restaurantForm.value.restaurantName,
      address: restaurantForm.value.address,
      username: restaurantForm.value.username,
    };
    console.log(restaurant)
    // this.restaurantService.addRestaurant(restaurant).subscribe({
    //   next: (response: AppResponse) => {
    //     this.restaurants= response.data;

    //     // if (restaurants.length > 0) {
    //     //   this.restaurants = restaurants;
    //     //   restaurantForm.reset();
    //     // }
    //   },
    // });
  }
  editRestautant(restaurant: Restaurant, restaurantForm: NgForm) {
    this.restaurantText = 'Edit';
    console.log(restaurant, restaurantForm.value);
    let restaurantValue = {title:restaurantForm.value.title,address:restaurantForm.value.address};
  }

  deleteRestaurant(restaurantId: number): void {
    this.restaurantService.deleteRestaurant(restaurantId).subscribe({
      next: (response: AppResponse) => {
        this.restaurants = response.data;
      },
    });
  }
  // category
  addCategory(categoryForm: NgForm): void {
    let category: Category = {
      id: this.editCategoryId,
      title: categoryForm.value.categoryName,
    };
    // this.categoryService.addCategory(category).subscribe({
    //   next: (response: any) => {
    //     let categories: Category[] = response.data;
    //     if (categories.length > 0) {
    //       this.categories = categories;
    //       this.editCategoryId = 0;
    //       this.categoryText = 'Add';
    //       categoryForm.reset();
    //     }
    //   },
    // });
  }
  editCategory(category: Category, categoryForm: NgForm) {
    this.categoryText = 'Edit';
    let categoryValue = { categoryName: category.title };
    this.editCategoryId = category.id;
    categoryForm.resetForm(categoryValue);
  }
  deleteCategory(id: number): void {
    this.categoryService.deleteCategory(id).subscribe({
      next: (response: any) => {
        let categories: Category[] = response.data;
        console.log(categories);
        if (categories.length > 0) {
          this.categories = categories;
        }
      },
    });
  }

  // product
  deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe({
      next: (response: AppResponse) => {
        this.products = response.data;
      },
    });
  }

  // static

  isUserLoggedIn(): boolean {
    return this.storageService.isUserLoggedIn();
  }

  categoryProducts(id: number): void {
    this.productService.productDetails(id);
    this.router.navigate(['category', id]);
  }
  restaurantOrders(id: number): void {
    this.router.navigate(['restaurant_orders']);
  }
  logout(): void {
    this.authService.logout();
  }
  productDetails(id: number): void {
    this.productService.productDetails(id);
    this.router.navigate(['product', id]);
  }
  restaurantDetails(id: number): void {
    // this.productService.productDetails(id);
    this.router.navigate(['restaurant', id]);
  }

}
