import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { HomeService } from 'src/app/service/home.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/service/storage.service';
import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/model/product';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';
import { NgForm } from '@angular/forms';
import { AppResponse } from 'src/app/model/appResponse';
import { AppUser } from 'src/app/model/appUser';
import { RestaurantService } from 'src/app/service/restaurant.service';
import { CONSTANT, urlEndpoint } from 'src/app/utils/constant';
import { Cart } from 'src/app/model/cart';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'restaurant-home',
  templateUrl: './home.component.html',
})
export class RestaurantHomeComponent implements OnInit {
  // While Restaurant LogIn
  products: Product[] = [];
  userCart: Cart[] = [];
  categories: Category[] = [];
  user: AppUser = this.storageService.getLoggedInUser();
  count = 0;
  editProductId = 0;
  productText = 'Add';
  id = parseInt(this.router.url.split('/')[2]);
  restaurantId = 0;
  productFile = '';
  categoryFile = '';
  constructor(
    private router: Router,
    private storageService: StorageService,
    private productService: ProductService,
    private categoryService: CategoryService,
    private restaurantService: RestaurantService,
    private cartService:CartService
  ) {}
  ngOnInit(): void {
    this.categoryService.getAllCategory().subscribe({
      next: (response: AppResponse) => {
        let categories: Category[] = response.data;
        if (categories.length > 0) {
          this.categories = categories;
        }
      },
    });
    if(this.user.role===CONSTANT.RESTAURANT){
      // console.log(1234)
      this.restaurantService
      .getRestaurantDetailsByUserId(this.user.id)
      .subscribe({
        next: (response: AppResponse) => {
          this.restaurantId = response.data[0].id;
          // console.log(this.restaurantId);
          // console.log(response.data)
          this.loadProduct(this.restaurantId);
        },
      });
    }
    else if(this.user.role===CONSTANT.USER || !this.isLoggedIn()){
      // console.log(123)
     this.loadProduct(this.id);
    }
    
    // console.log(this.restaurantId)
    
    
  }
 
  loadProduct(restId:number) {
    this.productService.getRestaurantProducts(restId).subscribe({
      next: (response: AppResponse) => {
        this.products = response.data;
        console.log(this.products);
      },
    });
  }

  addCategory(categoryForm: NgForm): void {
    let categoryId = 0;
    let formData = new FormData();
    formData.append('title', categoryForm.value.categoryName);
    formData.append('photo', this.categoryFile);
    this.categoryService.addCategory(formData, categoryId).subscribe({
      next: (response: any) => {
        let categories: Category[] = response.data;
        this.categories = categories;
        categoryForm.reset();
        this.categoryFile = '';
      },
    });
  }
  productFileChange(event: any): void {
    let input = event.target;
    if (input && input.files.length) {
      this.productFile = input.files[0];
    }
  }
  categoryFileChange(event: any): void {
    let input = event.target;
    if (input && input.files.length) {
      this.categoryFile = input.files[0];
    }
  }
  downloadProductPhoto(productId: number): any {
    return this.productService.downloadPhoto(productId);
  }
  downloadCategoryPhoto(categoryId: number): any {
    return this.categoryService.downloadPhoto(categoryId);
  }

  addProduct(addProductForm: NgForm): void {
    let formData = new FormData();
    formData.append('photo', this.productFile);
    formData.append('title', addProductForm.value.productName);
    formData.append('description', addProductForm.value.description);
    formData.append('price', addProductForm.value.price);
    formData.append('categoryId', addProductForm.value.categoryId);
    formData.append('restaurantId', this.restaurantId.toString());
    formData.append('count', addProductForm.value.count);
    formData.append('vegOrNonVegId', addProductForm.value.vegOrNonVeg);
    formData.append('id', this.editProductId.toString());
    console.log(formData);
    this.productService.addProduct(formData, this.editProductId).subscribe({
      next: (response: AppResponse) => {
        let products: Product[] = response.data;
        addProductForm.reset();
        this.productFile = '';
        this.productText = 'Add';
        this.loadProduct(this.restaurantId);
      },
    });
  }
  editProduct(product: Product, productForm: NgForm) {
    this.productText = 'Edit';
    let productValue = {
      categoryId: product.categoryId,
      count: product.count,
      description: product.description,
      price: product.price,
      productName: product.title,
      vegOrNonVeg: product.vegOrNonVegId,
    };
    console.log(product, productForm.value, productValue);
    this.editProductId = product.id;
    productForm.resetForm(productValue);
  }

  deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe({
      next: (response: AppResponse) => {
        this.products = response.data;
      },
    });
  }

  isLoggedIn(): boolean {
    return this.storageService.isUserLoggedIn();
  }
  productDetails(id: number): void {
    this.router.navigate(['product', id]);
  }
  categoryProducts(id: number): void {
    this.router.navigate(['category', id]);
  }
  restaurantOrders(id: number): void {
    this.router.navigate(['restaurant_orders']);
  }
  isUser(): boolean {
    if (this.user.role === CONSTANT.USER) return true;
    return false;
  }
  admin(): boolean {
    if (this.user.role === CONSTANT.ADMIN) return true;
    return false;
  }
  isRestaurant(): boolean {
    if (this.user.role === CONSTANT.RESTAURANT) return true;
    return false;
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

}
