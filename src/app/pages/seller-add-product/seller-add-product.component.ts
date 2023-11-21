import { Component, ComponentFactoryResolver } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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
    private productService: ProductService,
    private _snackBar: MatSnackBar,
    private router: Router
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
        .sellerAddProduct({
          SellerId: this.seller?.id,
          StoreName: this.seller?.StoreName,
          ...productDetail.value,
        })
        .subscribe((res) => {
          if (res) {
            productDetail.reset();
            this._snackBar.open(
              'Success! Product added in store! ✌🏼',
              'Dismiss',
              {
                duration: 3000, // Duration in milliseconds
                horizontalPosition: 'end', // Display on the right
                verticalPosition: 'top', // Display at the top
                panelClass: ['custom-snack-bar'],
              }
            );
            this.router.navigate(['/seller-home']);
          }
        });
    } else {
      this.invalidSubmission = true;
    }
  }
}
