import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import ISellerProduct from 'src/app/data-type';
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

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private productService: ProductService
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
}
