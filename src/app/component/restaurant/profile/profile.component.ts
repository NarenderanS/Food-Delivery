import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppResponse } from 'src/app/model/appResponse';
import { AppUser } from 'src/app/model/appUser';
import { Restaurant } from 'src/app/model/restaurant';
import { RestaurantService } from 'src/app/service/restaurant.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class RestaurantProfileComponent {
  name='';
  address=''
  user: AppUser = this.storageService.getLoggedInUser();
  restaurantId = 0;
  count=0;
  restaurants: Restaurant[] = [];
  constructor( private storageService: StorageService,
    private restaurantService: RestaurantService
  ){// for Restaurant Details
    this.restaurantService
      .getRestaurantDetailsByUserId(this.user.id)
      .subscribe({
        next: (response: AppResponse) => {
          this.restaurants = response.data;
          console.log(response.data)
          this.count=this.restaurants.length;
          this.restaurantId = this.restaurants[0].id;
        },
      });

  }

  

}
