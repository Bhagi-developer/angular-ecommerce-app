import { Component, OnInit } from '@angular/core';
import ISellerProduct, { IsellerDataType } from 'src/app/data-type';
import { HttpClient } from '@angular/common/http';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css'],
})
export class SellerHomeComponent {
  seller: IsellerDataType | null = null;
  products: ISellerProduct[] | null = null;

  data: any = [];

  constructor(private sellerService: SellerService, private http:HttpClient) {
    const sellerData = localStorage.getItem('seller');
    if (sellerData) {
      this.seller = JSON.parse(sellerData);
    }
  }

  ngOnInit() {
    console.log('hello world');

    this.sellerService.sellerGetProducts().subscribe((res) => {
      if (res) {
        this.products = res;
      } else {
        console.log('no produts to show');
        this.products= [];
      }
    });
  }

  updateProducts(confirm:boolean){
    if(confirm)
    {
      this.sellerService.sellerGetProducts().subscribe((res)=>{
        if(res)
        {
          this.products= res;
        }
        else{
          console.log('no products to show');
          this.products= [];
        }
      })
    }
  }
}
