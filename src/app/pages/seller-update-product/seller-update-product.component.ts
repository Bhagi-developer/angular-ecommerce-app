import { NgFor } from '@angular/common';
import { TypeModifier } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import ISellerProduct from 'src/app/data-type';
import { ProductService } from 'src/app/services/product.service';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css'],
})
export class SellerUpdateProductComponent {
  product: ISellerProduct = {
    id: 0,
    Name: '',
    Price: 0,
    Category: '',
    PaymentMethod: '',
    Quantity: 0,
    StoreName: '',
    SellerId: 0,
    ListProduct: false, // Initialize ListProduct as needed
  };

  invalidSubmission: boolean = false;
  updateProductSuccess: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private sellerService: SellerService,
    private router: Router,
    private productService: ProductService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.sellerGetProduct(id)?.subscribe((res) => {
      this.product = res;
    });
  }

  updateProductObject(form: NgForm) {
    if (this.product?.Name) {
      this.product.Name = form.value.Name;
    }
    if (this.product?.Price) {
      this.product.Price = form.value.Price;
    }
    if (this.product?.Category) {
      this.product.Category = form.value.Category;
    }
    if (this.product?.PaymentMethod) {
      this.product.PaymentMethod = form.value.PaymentMethod;
    }
    if (this.product?.Quantity) {
      this.product.Quantity = form.value.Quantity;
    }
  }

  alertFun() {}

  onUpdateProduct(form: NgForm) {
    if (form.invalid) {
      this.invalidSubmission = true;
    } else {
      this.invalidSubmission = false;
      this.updateProductObject(form);
      console.log(form.value);

      this.productService
        .sellerUpdateProduct(this.product?.id, this.product)
        .subscribe((res) => {
          this._snackBar.open('Success! Product updated! 👍🏼', 'Dismiss', {
            duration: 3000, // Duration in milliseconds
            horizontalPosition: 'end', // Display on the right
            verticalPosition: 'top', // Display at the top
          });

          this.router.navigate(['/seller-home']);
        });
    }
  }
}
