import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AnimationOptions } from 'ngx-lottie';
import { Address } from 'src/app/model/address';
import { AppResponse } from 'src/app/model/appResponse';
import { AppUser } from 'src/app/model/appUser';
import { Cart } from 'src/app/model/cart';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/service/cart.service';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  options: AnimationOptions = {
    path: '/assets/emptyCart.json',
  };
  products: Product[] = [];
  addresses: Address[] = [];
  userCart: Cart[] = [];
  deliveryAddressId: number = 0;
  user: AppUser = this.storageService.getLoggedInUser();
  constructor(
    private userService: UserService,
    private storageService: StorageService,
    private cartService: CartService,
    private productService: ProductService,
    private orderService: OrderService
  ) {}
  ngOnInit(): void {
    // this.userCart = this.cartService.loadUserCart(this.user.id);
    this.cartService.getUserCart(this.user.id).subscribe({
      next: (response: AppResponse) => {
        this.userCart = response.data;
      },
    });
    this.productService.getAllProducts().subscribe({
      next: (response: any) => {
        let products: Product[] = response.data;
        if (products.length > 0) {
          // console.log(response.data);
          this.products = products.sort(()=>Math.random()-0.5);
        }
      },
    });
  }
  getUserAddress(): void {
    this.userService.getUserAddress(this.user.id).subscribe({
      next: (response: AppResponse) => {
        this.addresses = response.data;
      },
    });
  }
  addAddress(addressForm: NgForm): void {
    console.log(addressForm.value);
    let newAddress: any = {
      userId: this.user.id,
      address: addressForm.value.address,
      city: addressForm.value.city,
      zipcode: parseInt(addressForm.value.zipcode),
    };
    console.log(newAddress);
    this.userService.addUserAddress(newAddress).subscribe({
      next: (response: AppResponse) => {
        this.addresses = response.data;
        addressForm.reset();
      },
    });
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
          this.deleteFromCart(cartProduct.id);
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
  deleteFromCart(cartId: number) {
    this.cartService.deleteFromCart(cartId).subscribe({
      next: (response: AppResponse) => {
        this.userCart = response.data;
        return;
      },
    });
  }
  getCartCount(): number {
    let count = 0;
    for (let i of this.userCart) {
      count += i.count;
    }
    return count;
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
  getPrice(): number {
    let total: number = 0;
    for (let i of this.userCart) {
      total += i.price * i.count;
    }
    return total;
  }

  orderAddress(orderAddressForm: NgForm) {
    this.deliveryAddressId = orderAddressForm.value.orderAddressId;
    console.log(this.deliveryAddressId);
  }
  placeOrder(): void {
    console.log('placed');
    this.orderService
      .placeOrder({ userId: this.user.id, addressId: this.deliveryAddressId })
      .subscribe({
        next: (response: AppResponse) => {
          this.userCart = [];
        },
      });
    this.deliveryAddressId = 0;
  }
}
