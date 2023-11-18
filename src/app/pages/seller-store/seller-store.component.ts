import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import ISellerProduct, { IUser, IUserCartProduct } from 'src/app/data-type';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-seller-store',
  templateUrl: './seller-store.component.html',
  styleUrls: ['./seller-store.component.css'],
})
export class SellerStoreComponent {
  sellerId: string = '';
  storeProducts: ISellerProduct[] | undefined = undefined;
  user: IUser | null = null;
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private productService: ProductService,
    private userService:UserService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    const sellerId = this.route.snapshot.paramMap.get('sellerId');
    if (sellerId) {
      this.sellerId = sellerId;
    }

    this.productService
      .sellerGetProductsById(this.sellerId)
      .subscribe((res) => {
        this.storeProducts = res;
      });
  }

  isUserAuthenticated(){
    return UserService.isUserAuthenticated;
  }

  openProductDetail(id: number) {
    this.router.navigate([`/product/${id}`]);
  }

  addToCart(product: ISellerProduct) {
    const data: IUserCartProduct = {
      id:null,
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
