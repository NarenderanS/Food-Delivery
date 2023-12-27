import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { HomeComponent } from './component/home/home.component';
import { AdminHomeComponent } from './component/admin/home/home.component';
import { authGuard } from './guard/auth.guard';
import { RestaurantHomeComponent } from './component/restaurant/home/home.component';
import { ProductComponent } from './component/product/product.component';
import { CartComponent } from './component/cart/cart.component';
import { OrderComponent } from './component/order/order.component';
import { ProfileComponent } from './component/profile/profile.component';
import { CategoryComponent } from './component/category/category.component';
import { OrdersComponent } from './component/restaurant/orders/orders.component';
import { RestaurantProfileComponent } from './component/restaurant/profile/profile.component';
import { UserDetailsComponent } from './component/admin/user-details/user-details.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent},
  {
    path: 'admin/home',
    component: AdminHomeComponent,
    canActivate: [authGuard],
  },{path:'admin/userDetails',component:UserDetailsComponent,canActivate:[authGuard]},
  { path: 'restaurant/:id', component: RestaurantHomeComponent},
  {path:'restaurant_orders',component:OrdersComponent,canActivate:[authGuard]},
  {path:'restaurant_profile',component:RestaurantProfileComponent,canActivate:[authGuard]},
  { path: 'product/:id', component: ProductComponent},
  { path: 'category/:id', component: CategoryComponent},
  { path: 'cart', component: CartComponent ,canActivate:[authGuard]},
  { path: 'order', component: OrderComponent ,canActivate:[authGuard]},
  { path: 'profile', component: ProfileComponent,canActivate:[authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
