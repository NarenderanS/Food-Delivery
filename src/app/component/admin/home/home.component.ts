import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from 'src/app/model/address';
import { AppResponse } from 'src/app/model/appResponse';
import { AppUser } from 'src/app/model/appUser';
import { Category } from 'src/app/model/category';
import { OrderStatus } from 'src/app/model/orderStatus';
import { Product } from 'src/app/model/product';
import { Restaurant } from 'src/app/model/restaurant';
import { UserDetails } from 'src/app/model/user-details';
import { AuthService } from 'src/app/service/auth.service';
import { CategoryService } from 'src/app/service/category.service';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';
import { RestaurantService } from 'src/app/service/restaurant.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';
import { CONSTANT } from 'src/app/utils/constant';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['/admin.css'],
})
export class AdminHomeComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  restaurants: Restaurant[] = [];
  allUsers: AppUser[] = [];
  addresses: Address[] = [];
  orders: any = [];
  adminOrders: any = [];
  statuses: OrderStatus[] = [];
  count = 0;
  editCategoryId = 0;
  categoryText = 'Add';
  restaurantText = 'Add';
  editRestaurantId = 0;
  categoryVisible = false;
  productVisible = false;
  userVisible = false;
  restaurantVisible = false;
  categoryFile = '';
  restaurantFile = '';
  error = '';
  usersCount = 0;
  id = parseInt(this.router.url.split('/')[2]);

  constructor(
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService,
    private productService: ProductService,
    private categoryService: CategoryService,
    private restaurantService: RestaurantService,
    private userService: UserService,
    private orderService: OrderService
  ) {}
  ngOnInit(): void {
    this.restaurantService.getAllStatus().subscribe({
      next: (response: AppResponse) => {
        this.statuses = response.data;
      },
    });
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
    this.orderService.getAllOrders().subscribe({
      next: (response: AppResponse) => {
        this.adminOrders = response.data;
        console.log(this.adminOrders);
        console.log(this.adminOrders[1].orderStatus);
        for (let i of this.orders) {
          // console.log(i.orderedProducts)
          // console.log(i.address)
        }
      },
    });
    this.userService.getAllUsers().subscribe({
      next: (response: any) => {
        this.allUsers = response.data;
        for (let i of this.allUsers) {
          if (i.role === CONSTANT.USER) {
            console.log(i);
            this.usersCount += 1;
          }
        }
        // console.log(allUsers)
      },
    });
  }
  getOrdersCount(): number {
    return this.orders.length;
  }
  getAllOrdersCount() {
    return this.adminOrders.length;
  }
  getPrice(p: Product[]): number {
    let price: number = 0;
    for (let item of p) {
      price += item.price;
    }
    return price;
  }

  categoryVisibility(): void {
    if (this.categoryVisible === true) {
      this.categoryVisible = false;
    } else {
      this.categoryVisible = true;
    }
  }
  productVisibility(): void {
    if (this.productVisible === true) {
      this.productVisible = false;
    } else {
      this.productVisible = true;
    }
  }
  userVisibility(): void {
    if (this.userVisible === true) {
      this.userVisible = false;
    } else {
      this.userVisible = true;
    }
  }
  restaurantVisibility(): void {
    if (this.restaurantVisible === true) {
      this.restaurantVisible = false;
    } else {
      this.restaurantVisible = true;
    }
  }
  getUserAddress(userId: number) {
    this.userService.getUserAddress(userId).subscribe({
      next: (response: AppResponse) => {
        this.addresses = response.data;
        console.log(this.addresses);
      },
    });
  }
  getRestaurantOrders(restaurantId: number) {
    this.orderService.getRestaurantOrders(restaurantId).subscribe({
      next: (response: AppResponse) => {
        console.log(response.data);
        this.orders = response.data;
      },
    });
  }

  // restaurant
  restaurantFileChange(event: any): void {
    let input = event.target;
    if (input && input.files.length) {
      this.restaurantFile = input.files[0];
    }
  }

  registerRestaurant(restaurantForm: NgForm): void {
    let formData = new FormData();
    formData.append('id', this.editRestaurantId.toString());
    formData.append('title', restaurantForm.value.restaurantName);
    formData.append('address', restaurantForm.value.address);
    formData.append('username', restaurantForm.value.username);
    formData.append('photo', this.restaurantFile);
    this.restaurantService
      .addRestaurant(formData, this.editRestaurantId)
      .subscribe({
        next: (response: AppResponse) => {
          this.restaurants = response.data;
          restaurantForm.reset();
        },
        error: (err) => {
          console.log(err);

          this.error = err.error.error.message;
        },
        complete: () => console.log('There are no more action happen.'),
      });
  }
  editRestautant(restaurant: Restaurant, restaurantForm: NgForm) {
    this.restaurantText = 'Edit';
    console.log(restaurant, restaurantForm.value);
    let restaurantValue = {
      title: restaurantForm.value.title,
      address: restaurantForm.value.address,
    };
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
    let formData = new FormData();
    formData.append('photo', this.categoryFile);
    formData.append('id', this.editCategoryId.toString());
    formData.append('title', categoryForm.value.categoryName);
    this.categoryService.addCategory(formData, this.editCategoryId).subscribe({
      next: (response: any) => {
        let categories: Category[] = response.data;
        if (categories.length > 0) {
          this.categories = categories;
          this.editCategoryId = 0;
          this.categoryText = 'Add';
          categoryForm.reset();
        }
      },
    });
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
  categoryFileChange(event: any): void {
    let input = event.target;
    if (input && input.files.length) {
      this.categoryFile = input.files[0];
    }
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
