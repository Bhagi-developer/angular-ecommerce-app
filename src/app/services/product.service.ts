import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ISellerProduct, { IsellerDataType } from '../data-type';
import { SellerService } from './seller.service';
import { BehaviorSubject } from 'rxjs';
import { SelectorContext } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  seller: IsellerDataType | null = null;
  private searchProductsSubject = new BehaviorSubject<
    ISellerProduct[] | undefined
  >(undefined);
  searchProductsEmitter = this.searchProductsSubject.asObservable();

  constructor(private http: HttpClient, private sellerService: SellerService) {}

  ngOnInit() {
    this.sellerService.sellerDataEmitter.subscribe((res) => {
      this.seller = res;
    });
  }

  //To add product by seller
  sellerAddProduct(data: ISellerProduct) {
    return this.http.post('http://localhost:3000/products', data);
  }

  //To get all products of a seller
  sellerGetProducts(sellerId: number | undefined) {
    return this.http.get<ISellerProduct[]>(
      `http://localhost:3000/products?SellerId=${sellerId}`
    );
  }

  //To get all products of seller by id
  sellerGetProductsById(id: string) {
    return this.http.get<ISellerProduct[]>(
      `http://localhost:3000/products?SellerId=${id}`
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
  sellerUpdateProduct(id: number | undefined, data: ISellerProduct | null) {
    return this.http.put(`http://localhost:3000/products/${id}`, data);
  }

  //get all products
  getAllProducts() {
    return this.http.get<ISellerProduct[]>('http://localhost:3000/products');
  }

  //get listed products
  getListedProducts() {
    return this.http.get<ISellerProduct[]>(
      `http://localhost:3000/products?ListProduct=true`
    );
  }

  //get listed products
  getUnListedProducts() {
    return this.http.get<ISellerProduct[]>(
      `http://localhost:3000/products?ListProduct=false`
    );
  }

  //get search suggetions
  getSuggestedProducts(query: string) {
    return this.http.get<ISellerProduct[]>(
      `http://localhost:3000/products?q=${query}`
    );
  }

  //all produts emitter(which sends only listed products)
  emitAllProducts() {
    this.getListedProducts().subscribe((res) => {
      this.searchProductsSubject.next(res);
    });
  }

  //filter products from search emitter
  emitSearchProducts(products: ISellerProduct[] | undefined) {
    this.searchProductsSubject.next(products);
  }
}
