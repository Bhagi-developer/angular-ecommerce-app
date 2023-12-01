import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  numberAttribute,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import ISellerProduct, {
  IUser,
  IUserCartProduct,
  IUserWishList,
} from 'src/app/data-type';
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
  productWishListed: boolean = false;
  userWishList: IUserWishList | undefined = undefined;
  @ViewChild('favoriteIcon') favoriteIcon!: ElementRef;

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
      //fetching product data from http request using url parameter id
      const id = this.route.snapshot.paramMap.get('id');
      this.productService.sellerGetProduct(id).subscribe((res) => {
        this.product = res;
      });
    }

    this.userService.userDataEmitter.subscribe((res) => {
      this.user = res;

      //fetching user wishlist
      this.userService
        .getUserWishlist(this.user?.id)
        .subscribe((resUserWishList: any) => {
          this.userWishList = resUserWishList[0];

          this.userWishList?.products.forEach((p) => {
            if (this.product != null) {
              if (this.product.id == p.id) {
                this.productWishListed = true;
              }
            } else {
              if (this.productParam?.cartProduct.id == p.id) {
                this.productWishListed = true;
              }
            }
          });

          if (this.productWishListed) {
            this.favoriteIcon.nativeElement.classList.remove('white-color');
            this.favoriteIcon.nativeElement.classList.add('pink-color');
          } else {
            this.favoriteIcon.nativeElement.classList.remove('pink-color');
            this.favoriteIcon.nativeElement.classList.add('pink-color');
          }
        });
    });
  }

  openSellerStore() {
    let sellerId: number | undefined = 1;
    if (this.productParam) {
      sellerId = this.productParam.cartProduct.SellerId;
    } else {
      sellerId = this.product?.SellerId;
    }
    this.router.navigate([`/store/${sellerId}`]);
  }

  addToCart(product: ISellerProduct) {
    const data: IUserCartProduct = {
      id: null,
      userId: this.user?.id,
      cartProduct: product,
      quantity: this.quantity,
    };

    this.userService.addProductInCart(data);

    this._snackBar.open('Success! Cart updated! 🎅🏼', 'Dismiss', {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'end', // Display on the right
      verticalPosition: 'top', // Display at the top
    });
  }

  handleWishListProduct(e: Event) {
    const wishListIcon = e.currentTarget as HTMLElement;

    if (this.productWishListed) {
      //remove from wishlist
      wishListIcon.classList.add('white-color');
      wishListIcon.classList.remove('pink-color');

      if (this.product != null) {
        this.userService.removeProductFromUserWishlist(
          this.user?.id,
          this.product
        );
      } else {
        if (this.productParam != null) {
          this.userService.removeProductFromUserWishlist(
            this.user?.id,
            this.productParam.cartProduct
          );
        }
      }
    } else {
      //add in wishlist
      wishListIcon.classList.add('pink-color');
      wishListIcon.classList.remove('white-color');

      if (this.product != null) {
        this.userService.addProductInUserWishlist(this.user?.id, this.product);
      } else {
        if (this.productParam != null) {
          this.userService.addProductInUserWishlist(
            this.user?.id,
            this.productParam.cartProduct
          );
        }
      }
    }
    this.productWishListed = !this.productWishListed;
  }
}
