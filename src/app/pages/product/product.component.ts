import { Component, Input, numberAttribute } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import ISellerProduct, { IUser, IUserCartProduct } from 'src/app/data-type';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  product: ISellerProduct | null = null;
  @Input() cartButton: boolean = false;
  @Input() productParam: IUserCartProduct | null = null;
  user: IUser | null = null;
  quantity: number = 1;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    if (this.productParam) {
      //already getting product data from parent component
    } else {
      //fetching produc data from http request using url parameter id
      const id = this.route.snapshot.paramMap.get('id');
      this.productService.sellerGetProduct(id).subscribe((res) => {
        this.product = res;
      });
    }

    this.userService.userDataEmitter.subscribe((res) => {
      this.user = res;
    });
  }

  openSellerStore(sellerId: number | undefined) {
    this.router.navigate([`/store/${sellerId}`]);
  }

  addToCart(product: ISellerProduct) {
    const data: IUserCartProduct = {
      userId: this.user?.id,
      cartProduct: product,
      quantity: this.quantity,
    };

    this.userService.addProductInCart(data);

    this._snackBar.open('Success! Cart updated!', 'Dismiss', {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'end', // Display on the right
      verticalPosition: 'top', // Display at the top
    });
  }
}
