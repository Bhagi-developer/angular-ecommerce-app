import { Component, ComponentFactoryResolver } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IsellerDataType } from 'src/app/data-type';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css'],
})
export class SellerAddProductComponent {
  invalidSubmission: boolean = false;
  selectedPaymentMethod: string = 'Both';
  ListProductSelection: boolean = true;
  seller: IsellerDataType | null = null;
  addProductSuccess:boolean= false;

  constructor(private sellerService: SellerService) {
    const sellerData = localStorage.getItem('seller');
    if (sellerData) {
      this.seller = JSON.parse(sellerData);
    }
  }

  onAddProdct(productDetail: NgForm) {
    if (productDetail.valid) {
      this.invalidSubmission=false;
      
      this.sellerService.sellerAddProduct({SellerId:this.seller?.id,...productDetail.value}).subscribe((res)=>{
        if(res){
          productDetail.reset();
          this.addProductSuccess= true;
          setTimeout(() => {
            this.addProductSuccess= false;
          }, 2000);
        }
      });
    } else {
      this.invalidSubmission = true;
    }
  }
}
