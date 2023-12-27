import { Component } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { AnimationOptions } from 'ngx-lottie';
import { AppResponse } from 'src/app/model/appResponse';
import { Login } from 'src/app/model/login';
import { AppUser } from 'src/app/model/appUser';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { CONSTANT } from 'src/app/utils/constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  options: AnimationOptions = {
    path: '/assets/login.json',
  };

  username: String = '';
  password: String = '';
  error: String = '';

  constructor(private authService: AuthService,private router:Router) {}

  login(_loginForm: NgForm): void {
    this.authService.login(_loginForm.value).subscribe({
      next: (response: AppResponse) => {
        let user: AppUser = response.data;
        this.authService.setLoggedIn(user);
        if(user.role===CONSTANT.ADMIN){
        this.router.navigate(['/admin/home'],{replaceUrl:true})
        }
        else if(user.role===CONSTANT.RESTAURANT){
          this.router.navigate(['/restaurant/home'],{replaceUrl:true})
          }
        else if(user.role===CONSTANT.USER){
          this.router.navigate(['/home'],{replaceUrl:true})
          }

      },
      error: (err) => {
        console.log(err);

        let message: String = err.error.error.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
      complete: () => console.log('There are no more action happen.'),
    });
  }
}
