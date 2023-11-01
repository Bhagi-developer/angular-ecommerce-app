import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import ISellerProduct, {
  ISellerSignupDataType,
  IsellerDataType,
} from '../data-type';
import { IsellerLoginDataType } from '../data-type';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  static isSellerAuthenticated: boolean = false;
  isloginError = new EventEmitter<boolean>(false);
  private sellerDataSubject = new BehaviorSubject<IsellerDataType | null>(null);
  sellerDataEmitter = this.sellerDataSubject.asObservable();

  constructor(private http: HttpClient, private route: Router) {
    if (localStorage.getItem('seller')) {
      SellerService.isSellerAuthenticated = true;
    } else {
      SellerService.isSellerAuthenticated = false;
    }
  }

  //To sing up seller
  sellerSignUp(data: ISellerSignupDataType) {
    return this.http.post('http://localhost:3000/seller', data);
  }

  //To sign in seller
  sellerLogIn(data: IsellerLoginDataType) {
    this.http
      .get(
        `http://localhost:3000/seller?Email=${data.Email}&Password=${data.Password}`,
        { observe: 'response' }
      )
      .subscribe((response: any) => {
        if (response?.body?.length) {
          localStorage.setItem('seller', JSON.stringify(response.body[0]));
          SellerService.isSellerAuthenticated = true;
          this.route.navigate(['/seller-home']);
          this.sellerDataSubject.next(response.body[0]); // Emit the seller data
        } else {
          this.isloginError.emit(true);
        }
      });
  }

  //To add product in seller
  sellerAddProduct(data: ISellerProduct) {
    return this.http.post('http://localhost:3000/products', data);
  }
}
