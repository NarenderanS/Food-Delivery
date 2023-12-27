import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';
import { StorageService } from 'src/app/service/storage.service';
import { CONSTANT } from 'src/app/utils/constant';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  roleId: number = 0;
  constructor(
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService,
    private cartService: CartService
  ) {}
  isLoggedIn(): boolean {
    return this.storageService.isUserLoggedIn();
  }
  user(): boolean {
    if (this.storageService.getLoggedInUser().role === CONSTANT.USER)
      return true;
    return false;
  }
  admin(): boolean {
    if (this.storageService.getLoggedInUser().role === CONSTANT.ADMIN)
      return true;
    return false;
  }
  restaurant(): boolean {
    if (this.storageService.getLoggedInUser().role === CONSTANT.RESTAURANT)
      return true;
    return false;
  }

  logout(): void {
    this.authService.logout();
  }
  navBar(): boolean {
    return this.router.url !== '/';
  }
  getCartCount(): number {
    return this.cartService.getCartCount();
  }
}
