import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ISellerProduct, { IsellerDataType } from '../data-type';
import { SellerService } from './seller.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  seller:IsellerDataType|null= null;
  constructor(private http: HttpClient, private sellerService:SellerService) {}

  ngOnInit(){
    this.sellerService.sellerDataEmitter.subscribe((res)=>{
      this.seller= res;
    })
  }
  
  //To add product by seller
  sellerAddProduct(data: ISellerProduct) {
    return this.http.post('http://localhost:3000/products', data);
  }
  
  //To get all products of a seller
  sellerGetProducts() {
    let sellerData = localStorage.getItem('seller');
    if (sellerData) {
      this.seller = JSON.parse(sellerData);
    }

    return this.http.get<ISellerProduct[]>(
      `http://localhost:3000/products?SellerId=${this.seller?.id}`
    );
  }

  

  //delete a product
  sellerDeleteProduct(id: number | undefined) {
    if (id) {
      this.http
        .delete(`http://localhost:3000/products/${id}`)
        .subscribe((res) => {});
    }
  }

  //seller get product by id
  sellerGetProduct(id: string | null) {
    return this.http.get<ISellerProduct>(
      `http://localhost:3000/products/${id}`
    );
  }

  //seller update product
  sellerUpdateProduct(id: number | undefined, data: ISellerProduct) {
    return this.http.put(`http://localhost:3000/products/${id}`, data);
  }

  //get all products
  getAllProducts() {
    return this.http.get<ISellerProduct[]>('http://localhost:3000/products');
  }
}
