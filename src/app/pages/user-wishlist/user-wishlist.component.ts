import { Component } from '@angular/core';
import { IUser, IUserWishList } from 'src/app/data-type';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-wishlist',
  templateUrl: './user-wishlist.component.html',
  styleUrls: ['./user-wishlist.component.css'],
})
export class UserWishlistComponent {
  userWishList: IUserWishList | undefined = undefined;
  user: IUser | null = null;

  constructor(private userService: UserService) {}
  ngOnInit() {
    this.userService.userDataEmitter.subscribe((res) => {
      this.user = res;
      this.userService
        .getUserWishlist(this.user?.id)
        .subscribe((userWishList) => {
          this.userWishList = userWishList;
        });
    });
  }
}
