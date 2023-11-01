import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SellerService } from '../services/seller.service';
import { filter } from 'rxjs/operators';
import { IsellerDataType } from '../data-type';
import { SellerAddProductComponent } from '../pages/seller-add-product/seller-add-product.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  seller: IsellerDataType | null = null;
  pageViewType: string = 'default';

  constructor(private router: Router, private sellerService: SellerService) {
    this.sellerService.sellerDataEmitter.subscribe((seller) => {
      this.seller = seller;
      // SellerAddProductComponent.seller= this.seller;
    });
  }

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
      )
      .subscribe((event:any) => {
        if(event.url.includes('seller') && SellerService.isSellerAuthenticated)
        {
          this.pageViewType= 'seller';
        }
        else
        {
          this.pageViewType= 'default';
        }
      });
  }

  onLogout()
  {
    localStorage.removeItem('seller');
    SellerService.isSellerAuthenticated= false;
    this.router.navigate(['/seller-auth']);
  }
}
