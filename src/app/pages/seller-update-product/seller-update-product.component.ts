import { TypeModifier } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import ISellerProduct from 'src/app/data-type';
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

  constructor(private route: ActivatedRoute, private sellerService:SellerService) {}

  ngOnInit(){
    const id= this.route.snapshot.paramMap.get('id');
    this.sellerService.sellerGetProduct(id)?.subscribe((res)=>{
      this.product= res;
      console.log(res)
    })
  }

  onUpdateProduct(updateProductData:NgForm){

  }
}
