import { Component, numberAttribute } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import ISellerProduct from 'src/app/data-type';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  product: ISellerProduct | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.sellerGetProduct(id).subscribe((res) => {
      this.product = res;
      console.log(this.product);
    });
  }

  openSellerStore(sellerId: number|undefined) {
    this.router.navigate([`/store/${sellerId}`]);
  }
}
