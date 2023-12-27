import { Component } from '@angular/core';
import { Address } from 'src/app/model/address';
import { AppResponse } from 'src/app/model/appResponse';
import { AppUser } from 'src/app/model/appUser';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  user: AppUser = this.storageService.getLoggedInUser();
  userDetail: any = {};
  orders:Order[]=[]
  orderCount = 0;
  addresses: Address[] = [];
  constructor(
    private storageService: StorageService,
    private userService: UserService,
    private orderService:OrderService
  ) {
    userService.getUserById(this.user.id).subscribe({
      next: (response: AppResponse) => {
        this.userDetail = response.data;
        console.log(this.userDetail);
      },
    });
    orderService.getOrderedProducts(this.user.id).subscribe({
      next:(response:AppResponse)=>{
        this.orders=response.data
        this.orderCount=this.orders.length
      }
    })
    this.userService.getUserAddress(this.user.id).subscribe({
      next: (response: AppResponse) => {
        this.addresses = response.data;
        console.log(this.addresses)
      },
    });
    
  }

}
