import { CSP_NONCE, Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SellerService } from '../services/seller.service';
import { filter } from 'rxjs/operators';
import ISellerProduct, { IsellerDataType } from '../data-type';
import { SellerAddProductComponent } from '../pages/seller-add-product/seller-add-product.component';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  seller: IsellerDataType | null = null;
  pageViewType: string = 'default';
  showSuggetions: boolean = false;
  searchSuggetionProducts: undefined | ISellerProduct[] = undefined;
  productSearchString: string = '';

  constructor(
    private router: Router,
    private sellerService: SellerService,
    private productService: ProductService
  ) {
    console.log('navbar');
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        if (
          event.url.includes('seller') &&
          SellerService.isSellerAuthenticated
        ) {
          this.pageViewType = 'seller';
        } else {
          this.pageViewType = 'default';
        }
      });

    //emitting seller data from service
    this.sellerService.sellerDataEmit();

    this.sellerService.sellerDataEmitter.subscribe((res) => {
      this.seller = res;
    });

    this.productService.emitAllProducts();
  }

  onLogout() {
    localStorage.removeItem('seller');
    SellerService.isSellerAuthenticated = false;
    this.router.navigate(['/seller-auth']);
  }

  getAllHomeProducts(){
    this.productService.emitAllProducts();
  }

  searchSuggetionTrigger(event: Event) {
    const element = event.target as HTMLInputElement;
    let searchKeyWord = element.value.trim();

    if (searchKeyWord == '') {
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
    this.productService.emitSearchProducts(this.searchSuggetionProducts?.filter((product)=>{return product.Name==productName}));
    this.searchSuggetionProducts=undefined;
    this.productSearchString='';
  }

  searchProductButtonClick() {
    this.showSuggetions= false;
    if (this.productSearchString.trim() != '') {
      this.productService.emitSearchProducts(this.searchSuggetionProducts? this.searchSuggetionProducts:undefined);
    }
  }
}
