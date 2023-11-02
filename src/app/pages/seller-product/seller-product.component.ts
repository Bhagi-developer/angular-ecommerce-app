import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import ISellerProduct from 'src/app/data-type';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-seller-product',
  templateUrl: './seller-product.component.html',
  styleUrls: ['./seller-product.component.css'],
})
export class SellerProductComponent {
  @Input() product: ISellerProduct | null = null;
  @Output() updateProducts= new EventEmitter<boolean>();

  constructor(private sellerService: SellerService, private route:Router) {}

  deleteProduct(id: number | undefined) {
    this.sellerService.sellerDeleteProduct(id);
    this.updateProducts.emit(true);
  }

  
  updateProduct(id:number|undefined){
    this.route.navigate([`/seller-update-product/${id}`]);
  }
}
