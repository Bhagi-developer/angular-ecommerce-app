import { CSP_NONCE, Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SellerService } from '../services/seller.service';
import { filter } from 'rxjs/operators';
import ISellerProduct, { IsellerDataType, IUser } from '../data-type';
import { SellerAddProductComponent } from '../pages/seller-add-product/seller-add-product.component';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  seller: IsellerDataType | null = null;
  user: IUser | null = null;
  pageViewType: string = 'default';
  showSuggetions: boolean = false;
  searchSuggetionProducts: undefined | ISellerProduct[] = undefined;
  productSearchString: string = '';

  constructor(
    private router: Router,
    private sellerService: SellerService,
    private productService: ProductService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        if (
          event.url.includes('seller') &&
          SellerService.isSellerAuthenticated
        ) {
          this.pageViewType = 'seller';
        } else if (UserService.isUserAuthenticated) {
          this.pageViewType = 'user';
        } else {
          this.pageViewType = 'default';
        }
      });

    //emitting seller data from seller service
    this.sellerService.sellerDataEmit();

    this.sellerService.sellerDataEmitter.subscribe((res) => {
      this.seller = res;
    });

    //emitting user data from user service
    this.userService.userDataEmit();

    this.userService.userDataEmitter.subscribe((res) => {
      this.user = res;
    });

    //get all products on intial page load
    this.productService.emitAllProducts();
  }

  onSellerLogout() {
    localStorage.removeItem('seller');
    SellerService.isSellerAuthenticated = false;
    this.router.navigate(['/seller-auth']);
  }

  onUserLogOut() {
    localStorage.removeItem('user');
    UserService.isUserAuthenticated = false;
    this.router.navigate(['/user-auth']);
  }

  getAllHomeProducts() {
    this.productService.emitAllProducts();
  }

  searchSuggetionTrigger(event: Event) {
    const element = event.target as HTMLInputElement;
    let searchKeyWord = element.value.trim();

    if (searchKeyWord == '') {
      this.getAllHomeProducts();
      this.searchSuggetionProducts = undefined;
    }

    this.showSuggetions = true;
    if (event.type == 'keyup' && searchKeyWord != '') {
      this.productService
        .getSuggestedProducts(element.value.trim())
        .subscribe((res) => {
          this.searchSuggetionProducts = res;
        });
    }
  }

  searchProductSuggetionClick(productName: string) {
    this.productService.emitSearchProducts(
      this.searchSuggetionProducts?.filter((product) => {
        return product.Name == productName;
      })
    );
    this.showSuggetions = false;
    this.searchSuggetionProducts = undefined;
  }

  searchProductButtonClick() {
    this.showSuggetions = false;
    if (this.productSearchString.trim() != '') {
      this.productService.emitSearchProducts(
        this.searchSuggetionProducts ? this.searchSuggetionProducts : undefined
      );
    }
  }
}
