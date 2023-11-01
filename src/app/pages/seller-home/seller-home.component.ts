import { Component, OnInit } from '@angular/core';
import ISellerProduct, { IsellerDataType } from 'src/app/data-type';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css'],
})
export class SellerHomeComponent {
  seller: IsellerDataType | null = null;
  product: ISellerProduct | null = null;

  constructor() {
    const sellerData = localStorage.getItem('seller');
    if (sellerData) {
      this.seller = JSON.parse(sellerData);
    }
  }

  ngOnInit() {
    
  }
}
