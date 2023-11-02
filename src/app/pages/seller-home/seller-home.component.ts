import { Component, OnInit } from '@angular/core';
import ISellerProduct, { IsellerDataType } from 'src/app/data-type';
import { HttpClient } from '@angular/common/http';
import { SellerService } from 'src/app/services/seller.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css'],
})
export class SellerHomeComponent {
  seller: IsellerDataType | null = null;
  products: ISellerProduct[] | null = null;

  data: any = [];

  constructor(private sellerService: SellerService, private http: HttpClient, private productService:ProductService) {
    this.sellerService.sellerDataEmitter.subscribe((res) => {
      this.seller = res;
    });
  }

  ngOnInit() {
    this.productService.sellerGetProducts().subscribe((res) => {
      if (res) {
        this.products = res;
      } else {
        this.products = [];
      }
    });
  }

  updateProducts(confirm: boolean) {
    if (confirm) {
      this.productService.sellerGetProducts().subscribe((res) => {
        if (res) {
          this.products = res;
        } else {
          console.log('no products to show');
          this.products = [];
        }
      });
    }
  }
}
