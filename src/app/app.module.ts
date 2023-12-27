import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import player from 'lottie-web';
import { LottieModule } from 'ngx-lottie';
import { AdminHomeComponent } from './component/admin/home/home.component';
import { LoaderInterceptorService } from './service/interceptor/loaderInterceptor.service';
import { AuthInterceptorService } from './service/interceptor/authInterceptor.service';
import { NavbarComponent } from './component/navbar/navbar.component';
import { ProductComponent } from './component/product/product.component';
import { CartComponent } from './component/cart/cart.component';
import { OrderComponent } from './component/order/order.component';
import { ProfileComponent } from './component/profile/profile.component';
import { CategoryComponent } from './component/category/category.component';
import { DeliveryHistoryComponent } from './component/restaurant/delivery-history/delivery-history.component';
import { OrdersComponent } from './component/restaurant/orders/orders.component';
import { UserDetailsComponent } from './component/admin/user-details/user-details.component';
import { RestaurantProfileComponent } from './component/restaurant/profile/profile.component';
import { RestaurantHomeComponent } from './component/restaurant/home/home.component';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AdminHomeComponent,
    NavbarComponent,
    ProductComponent,
    CartComponent,
    OrderComponent,
    ProfileComponent,
    CategoryComponent,
    DeliveryHistoryComponent,
    OrdersComponent,
    UserDetailsComponent,
    RestaurantHomeComponent,
    RestaurantProfileComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
