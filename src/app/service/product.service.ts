import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { urlEndpoint } from '../utils/constant';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  
  products: Product[] = [];
  constructor(private http: HttpClient) {
    this.getAllProducts().subscribe({
      next: (response: AppResponse) => {
        this.products = response.data;
      },
    });
  }

  getAllProducts(): Observable<AppResponse> {
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/product/all`);
  }
  getRestaurantProducts(id: number): Observable<AppResponse> {
    return this.http.get<AppResponse>(
      `${urlEndpoint.baseUrl}/restaurant/product/${id}`
    );
  }
  getCategoryProducts(id: number): Observable<AppResponse> {
    return this.http.get<AppResponse>(
      `${urlEndpoint.baseUrl}/product/category/${id}`
    );
  }

  addProduct(product: FormData, productId: number): Observable<AppResponse> {
    if (productId === 0) {
      return this.http.post<AppResponse>(
        `${urlEndpoint.baseUrl}/restaurant/product`,
        product
      );
    }
    return this.http.put<AppResponse>(
      `${urlEndpoint.baseUrl}/restaurant/product/update`,
      product
    );
  }

  productDetails(id: number): Observable<AppResponse> {
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/product/${id}`);
  }
  deleteProduct(productId: number): Observable<AppResponse> {
    return this.http.delete<AppResponse>(
      `${urlEndpoint.baseUrl}/restaurant/product/delete/${productId}`
    );
  }
  downloadPhoto(productId: number): any {
    return `${urlEndpoint.baseUrl}/photo/downloadFile/product/${productId}`;
  }

  loadProducts(): Product[] {
    console.log();
    return this.products;
  }
}
