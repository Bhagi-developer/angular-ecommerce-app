import { Component, ComponentFactoryResolver } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IsellerDataType } from 'src/app/data-type';
import { ProductService } from 'src/app/services/product.service';
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
  addProductSuccess: boolean = false;

  constructor(
    private sellerService: SellerService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.sellerService.sellerDataEmitter.subscribe((res) => {
      this.seller = res;
    });
  }

  onAddProdct(productDetail: NgForm) {
    if (productDetail.valid) {
      this.invalidSubmission = false;

      this.productService
        .sellerAddProduct({ SellerId: this.seller?.id, StoreName:this.seller?.StoreName, ...productDetail.value })
        .subscribe((res) => {
          if (res) {
            productDetail.reset();
            this.addProductSuccess = true;
            setTimeout(() => {
              this.addProductSuccess = false;
            }, 2000);
          }
        });
    } else {
      this.invalidSubmission = true;
    }
  }
}
