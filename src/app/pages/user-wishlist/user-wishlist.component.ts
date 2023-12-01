import { Component } from '@angular/core';
import { Router } from '@angular/router';
import ISellerProduct, { IUser, IUserWishList } from 'src/app/data-type';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-wishlist',
  templateUrl: './user-wishlist.component.html',
  styleUrls: ['./user-wishlist.component.css'],
})
export class UserWishlistComponent {
  userWishList: IUserWishList | undefined = undefined;
  user: IUser | null = null;

  constructor(private userService: UserService, private router: Router) {}
  ngOnInit() {
    this.userService.userDataEmitter.subscribe((res) => {
      this.user = res;
      this.userService
        .getUserWishlist(this.user?.id)
        .subscribe((userWishList: any) => {
          this.userWishList = userWishList[0];
        });
    });
  }

  handleProductRemoveFromWishlist(
    userId: number | undefined,
    product: ISellerProduct
  ) {
    // Remove product from user's wishlist on the server
    this.userService.removeProductFromUserWishlist(userId, product);

    // Update the local userWishList array by filtering out the removed product
    if (this.userWishList && this.userWishList.products) {
      this.userWishList.products = this.userWishList.products.filter(
        (p) => p.id !== product.id
      );
    } else {
      console.log('No product to update');
    }
  }
}
