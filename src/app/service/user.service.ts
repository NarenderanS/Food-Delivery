import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { HttpClient } from '@angular/common/http';
import { urlEndpoint } from '../utils/constant';
import { Address } from '../model/address';
import { AppUser } from '../model/appUser';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  getAllUsers(): Observable<AppResponse> {
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/admin/user/all`);
  }
  getUserById(id: number): Observable<AppResponse> {
    return this.http.get<AppResponse>(
      `${urlEndpoint.baseUrl}/user/${id}`
    );
  }

  getUserAddress(id: number): Observable<AppResponse> {
    return this.http.get<AppResponse>(
      `${urlEndpoint.baseUrl}/user/address/${id}`
    );
  }
  addUserAddress(address: Address): Observable<AppResponse> {
    return this.http.post<AppResponse>(
      `${urlEndpoint.baseUrl}/user/address`,
      address
    );
  }
  updateUserAddress(address:Address): Observable<AppResponse> {
    return this.http.put<AppResponse>(
      `${urlEndpoint.baseUrl}/user/address`,
      address
    );
  }
}

