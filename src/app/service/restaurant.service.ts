import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { urlEndpoint } from '../utils/constant';
import { Restaurant } from '../model/restaurant';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  constructor(private http: HttpClient) {}

  getAllRestaurant(): Observable<AppResponse> {
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/restaurant/all`);
  }
  getRestaurantDetailsByUserId(userId: number): Observable<AppResponse> {
    return this.http.get<AppResponse>(
      `${urlEndpoint.baseUrl}/restaurant/product/user/${userId}`
    );
  }
  getAllStatus(): Observable<AppResponse> {
    return this.http.get<AppResponse>(
      `${urlEndpoint.baseUrl}/restaurant/order/status/all`
    );
  }
  
  addRestaurant(restaurant: FormData,restaurantId:number): Observable<AppResponse> {
    return this.http.post<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/restaurant`,
      restaurant
    );
  }
  downloadRestaurantPhoto(restaurantId: number): any {
    return `${urlEndpoint.baseUrl}/photo/downloadFile/restaurant/${restaurantId}`;
  }
  
  updateOrderStatus(order: any): Observable<AppResponse> {
    return this.http.put<AppResponse>(
      `${urlEndpoint.baseUrl}/restaurant/order/status`,
      order
    );
  }
 
  
  deleteRestaurant(restaurantId: number): Observable<AppResponse> {
    return this.http.delete<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/restaurant/${restaurantId}`
    );
  }
}
