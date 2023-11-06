import { Component } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { SellerService } from 'src/app/services/seller.service';
import { ProductService } from 'src/app/services/product.service';
import ISellerProduct from 'src/app/data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  products:ISellerProduct[]|undefined= undefined;
  
  constructor(private http:HttpClient, private sellerService:SellerService, private productService:ProductService, private route:Router){

  }

  ngOnInit(){
    this.productService.searchProductsEmitter.subscribe((res)=>{
      this.products=res;
    })
  }

  openProductDetail(id:number){
    this.route.navigate([`/product/${id}`])
  }

  openSellerStore(sellerId:number)
  {
    this.route.navigate([`/store/${sellerId}`]);
  }
}
