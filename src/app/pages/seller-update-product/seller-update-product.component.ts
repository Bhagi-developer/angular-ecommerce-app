import { NgFor } from '@angular/common';
import { TypeModifier } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  product:ISellerProduct|null= null;
  invalidSubmission:boolean= false;
  updateProductSuccess:boolean= false;

  constructor(private route: ActivatedRoute, private sellerService:SellerService, private router: Router, private productService:ProductService) {}

  ngOnInit(){
    const id= this.route.snapshot.paramMap.get('id');
    this.productService.sellerGetProduct(id)?.subscribe((res)=>{
      this.product= res;
    })
  }

  onUpdateProduct(updateProductData:NgForm){
    this.productService.sellerUpdateProduct(this.product?.id, updateProductData.value).subscribe((data)=>{
      this.updateProductSuccess= true;
      setTimeout(() => {
        this.updateProductSuccess= false;
      }, 2000);
    })
  }
}
