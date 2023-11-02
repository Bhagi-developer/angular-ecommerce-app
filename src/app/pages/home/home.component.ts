import { Component } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { SellerService } from 'src/app/services/seller.service';
import { ProductService } from 'src/app/services/product.service';
import ISellerProduct from 'src/app/data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  products:ISellerProduct[]|null= null;
  
  constructor(private http:HttpClient, private sellerService:SellerService, private productService:ProductService){

  }

  ngOnInit(){
    this.productService.getAllProducts().subscribe((res)=>{
      this.products= res;
    })
  }
}
