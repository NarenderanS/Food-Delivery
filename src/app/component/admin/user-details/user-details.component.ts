import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/model/address';
import { AppUser } from 'src/app/model/appUser';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
})
export class UserDetailsComponent implements OnInit {
  users: AppUser[] = [];
  userAddresses:Address[]=[];
  show=0;
  no=0;
  constructor(private userService: UserService) {}
  
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (response: any) => {
        let users: AppUser[] = response.data;
        console.log(users);
        if (users.length > 0) {
          this.users = users;
          
        }
      },
    });
  }
  address(id:number){
    console.log(id)
    this.show=id;
    this.userService.getUserAddress(id).subscribe({
      next: (response: any) => {
        let address: Address[] = response.data;
        console.log(address);
        if (address.length > 0) {
          this.userAddresses = address;
          
        }
      },
    });
  }
}
