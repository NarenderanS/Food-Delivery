import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AnimationOptions } from 'ngx-lottie';
import { AppResponse } from 'src/app/model/appResponse';
import { AppUser } from 'src/app/model/appUser';
import { Order } from 'src/app/model/order';
import { OrderStatus } from 'src/app/model/orderStatus';
import { Restaurant } from 'src/app/model/restaurant';
import { OrderService } from 'src/app/service/order.service';
import { RestaurantService } from 'src/app/service/restaurant.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
})
export class OrdersComponent implements OnInit {
  options: AnimationOptions = {
    path: '/assets/emptyCart.json',
  };
  orders: any = [];
  user: AppUser = this.storageService.getLoggedInUser();
  restaurantDetail: Restaurant[] = [];
  statuses: OrderStatus[] = [];
  restaurantId = 0;
  order=0;

  constructor(
    private storageService: StorageService,
    private orderService: OrderService,
    private restaurantService: RestaurantService
  ) {}
  ngOnInit(): void {
    this.restaurantService.getAllStatus().subscribe({
      next: (response: AppResponse) => {
        this.statuses = response.data;
      },
    });
    // for Restaurant Id
    this.restaurantService
      .getRestaurantDetailsByUserId(this.user.id)
      .subscribe({
        next: (response: AppResponse) => {
          this.restaurantDetail = response.data;
          this.restaurantId = this.restaurantDetail[0].id;
          this.loadOrders(this.restaurantId);
        },
      });

    // To edit
    // this.orderService.getAllOrders(this.restaurantId).subscribe({
    //   next: (response: AppResponse) => {
    //     // let o = [];
    //     console.log(response.data)
    //     this.orders = response.data;
    //     // for (let order of this.orders) {
    //     //   for (let i of order.orderedProducts) {
    //     //     console.log(i.restaurantId, this.restaurantDetail[0].id);
    //     //     if (i.restaurantId == this.restaurantDetail[0].id) {
    //     //       console.log(i);
    //     //       o.push(i);
    //     //     } else {
    //     //       console.log('not match');
    //     //     }
    //     //   }
    //     // }
    //     // this.orders = o;
    //     // console.log(response.data)
    //   },
    // });
  }
  loadOrders(restaurantId: number): void {
    this.orderService.getRestaurantOrders(restaurantId).subscribe({
      next: (response: AppResponse) => {
        console.log(response.data);
        this.orders = response.data;
        this.order=this.orders.length;
      },
    });
  }

  updateStatus(status: NgForm, orderId: number): void {
    let orderToUpdate = {
      orderId: orderId,
      statusId: status.value.orderStatus,
    };
    this.restaurantService.updateOrderStatus(orderToUpdate).subscribe({
      next: (response: AppResponse) => {
        this.orders = response.data;
      },
    });
  }
}
