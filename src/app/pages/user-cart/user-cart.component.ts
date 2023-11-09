import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IUserCartProduct } from 'src/app/data-type';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css'],
})
export class UserCartComponent {
  userCart: IUserCartProduct[] | null = null;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.userService.getUserCart().subscribe((res) => {
      this.userCart = res;
    });
  }

  deleteProductFromUserCart(userId: number | undefined, productId: number) {
    this.userService.getUserCartProduct(userId, productId).subscribe((res) => {
      this.userService
        .deleteProductFromUserCart(res[0].id)
        .subscribe((resInner) => {
          this.userService.getUserCart().subscribe((resInner2) => {
           
          });
        });
    });

    this.userService.userCartEmitter.subscribe((res) => {
      this.userCart = res;
    });

    this._snackBar.open('Success! Product deleted from cart!', 'Dismiss', {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'end', // Display on the right
      verticalPosition: 'top', // Display at the top
      panelClass: ['custom-snack-bar'],
    });
  }

  addProductQuantity( 
    userId: number | undefined,
    productId: number,
    addQuantityConfirm: boolean
  ) {
    this.userService.getUserCartProduct(userId, productId).subscribe((res) => {
      this.userService.updateProductCartQuantity(res[0], addQuantityConfirm);
    });
  }

  removeProductQuantity(
    userId: number | undefined,
    productId: number,
    addQuantityConfirm: boolean
  ) {
    this.userService.getUserCartProduct(userId, productId).subscribe((res) => {
      this.userService.updateProductCartQuantity(res[0], addQuantityConfirm);
    });
  }
}
