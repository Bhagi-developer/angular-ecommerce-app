import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IUserCartProduct } from 'src/app/data-type';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css'],
})
export class UserCartComponent {
  userCart: IUserCartProduct[] | null = null;

  constructor(private http: HttpClient, private userService: UserService) {}

  ngOnInit() {
    this.userService.getUserCart().subscribe((res) => {
      this.userCart = res;
    });
  }
}
