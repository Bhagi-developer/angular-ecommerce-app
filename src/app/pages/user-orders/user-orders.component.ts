import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUserCartProduct, IUserOrder } from 'src/app/data-type';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css'],
})
export class UserOrdersComponent {
  userOrders: IUserOrder[] | null = null;

  constructor(
    private router: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userService.getUserOrders().subscribe((res) => {
      this.userOrders = res;
    });
  }

  calculateOrderAmount(userOrder: IUserOrder) {
    let orderAmount = 0;
    userOrder.cartOrder?.forEach((order) => {
      orderAmount += order.quantity * order.cartProduct.Price;
    });

    return orderAmount;
  }
}
