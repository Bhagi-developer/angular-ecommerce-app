import { Component } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { SellerService } from 'src/app/services/seller.service';
import { ProductService } from 'src/app/services/product.service';
import ISellerProduct, { IUser, IUserCartProduct } from 'src/app/data-type';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  products: ISellerProduct[] | undefined = undefined;
  user: IUser | null = null;
  quantity: number = 1;
  showProductAddedaInCartSuccess: boolean = false;

  constructor(
    private http: HttpClient,
    private sellerService: SellerService,
    private productService: ProductService,
    private userService: UserService,
    private route: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.productService.searchProductsEmitter.subscribe((res) => {
      this.products = res;
    });
    this.userService.userDataEmitter.subscribe((res) => {
      this.user = res;
    });
  }

  isUserAuthenticated() {
    return UserService.isUserAuthenticated;
  }

  openProductDetail(id: number) {
    this.route.navigate([`/product/${id}`]);
  }

  openSellerStore(sellerId: number) {
    this.route.navigate([`/store/${sellerId}`]);
  }

  addToCart(product: ISellerProduct) {
    const data: IUserCartProduct = {
      userId: this.user?.id,
      cartProduct: product,
      quantity: this.quantity,
    };

    this.userService.addProductInCart(data);

    this._snackBar.open('Success! Card updated!', 'Dismiss', {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'end', // Display on the right
      verticalPosition: 'top', // Display at the top
      panelClass: ['custom-snack-bar'],
    });
  }
}
