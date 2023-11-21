import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import ISellerProduct from 'src/app/data-type';
import { ProductService } from 'src/app/services/product.service';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-seller-product',
  templateUrl: './seller-product.component.html',
  styleUrls: ['./seller-product.component.css'],
})
export class SellerProductComponent {
  @Input() product: ISellerProduct | undefined = undefined;
  @Input() storeLabelVisibility: boolean = true;
  @Input() editAccess: boolean = false;
  @Output() updateProducts = new EventEmitter<boolean>();

  constructor(
    private sellerService: SellerService,
    private route: Router,
    private productService: ProductService,
    private _snackBar: MatSnackBar
  ) {}

  deleteProduct(id: number | undefined) {
    if (confirm('confrim to delete product permanently!')) {
      this.productService.sellerDeleteProduct(id);
      this.updateProducts.emit(true);

      this._snackBar.open('Product deleted from Store!', 'Dismiss', {
        duration: 3000, // Duration in milliseconds
        horizontalPosition: 'end', // Display on the right
        verticalPosition: 'top', // Display at the top
      });
    }
  }

  updateProduct(id: number | undefined) {
    this.route.navigate([`/seller-update-product/${id}`]);
  }
}
