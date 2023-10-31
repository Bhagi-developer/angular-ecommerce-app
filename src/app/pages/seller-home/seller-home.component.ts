import { Component } from '@angular/core';
import { sellerDataType } from 'src/app/data-type';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css'],
})
export class SellerHomeComponent {
  seller: sellerDataType | null = null;

  constructor() {
    const sellerData = localStorage.getItem('seller');
    if (sellerData) {
      this.seller = JSON.parse(sellerData);
    }
  }
}
