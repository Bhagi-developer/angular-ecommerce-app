import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { sellerDataType } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class SellerService
{
  static isSellerAuthenticated:boolean= false;

  constructor(private http:HttpClient) {
    if(localStorage.getItem('seller'))
    {
      SellerService.isSellerAuthenticated= true;
    }
    else{
      SellerService.isSellerAuthenticated= false;
    }
   }

  sellerSignUp(data:sellerDataType)
  {
     return this.http.post("http://localhost:3000/seller", data);
  }
}