import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { HttpClient } from '@angular/common/http';
import { urlEndpoint } from '../utils/constant';
import { AppUser } from '../model/appUser';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  user: AppUser = this.storageService.getLoggedInUser();
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  placeOrder(detail: any): Observable<AppResponse> {
    return this.http.post<AppResponse>(
      `${urlEndpoint.baseUrl}/user/order`,
      detail
    );
  }
  // for admin
  getAllOrders(): Observable<AppResponse> {
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/admin/order/all`);
  }
  // for restaurant
  getRestaurantOrders(restaurantId:number): Observable<AppResponse> {
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/restaurant/order/${restaurantId}`);
  }
// From user
  getOrderedProducts(userId: number): Observable<AppResponse> {
    return this.http.get<AppResponse>(
      `${urlEndpoint.baseUrl}/user/order/${userId}`
    );
  }
}
