import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { AppResponse } from 'src/app/model/appResponse';
import { Register } from 'src/app/model/register';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  options: AnimationOptions = {
    path: '/assets/auth.json',
  };
  error = '';
  constructor(private authService: AuthService,private router :Router) {}
  
  register(registerForm: NgForm): void {
    console.log(registerForm.value);
    let register: Register = {
      username: registerForm.value.username,
      password: registerForm.value.password,
      name: registerForm.value.name,
      phoneNo: registerForm.value.phoneNo,
      gender: registerForm.value.gender,
    };
    console.log(register)
    this.authService.register(register).subscribe({
      next:(response:AppResponse)=>{
        this.router.navigate(['/login'], { replaceUrl: true });
      },
      error:(err)=>{

      }
    });
  }
}
