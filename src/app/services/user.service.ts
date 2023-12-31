import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import ISellerProduct, {
  IUserCartProduct,
  IUserOrder,
  IUserWishList,
  IsellerDataType,
} from '../data-type';
import { IUser } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userDataSubject = new BehaviorSubject<IUser | null>(null);
  userDataEmitter = this.userDataSubject.asObservable();

  private userCartSubject = new BehaviorSubject<IUserCartProduct[] | null>(
    null
  );
  userCartEmitter = this.userCartSubject.asObservable();

  isloginError = new EventEmitter<boolean>(false);
  static isUserAuthenticated: boolean = false;

  user: IUser | null = null;

  constructor(private http: HttpClient, private router: Router) {
    let userData = localStorage.getItem('user');
    if (userData) {
      UserService.isUserAuthenticated = true;
    } else {
      UserService.isUserAuthenticated = false;
    }
  }

  userSignUp(data: IUser) {
    return this.http.post<IUser>('http://localhost:3000/user', data);
  }

  userDataEmit() {
    let userData = localStorage.getItem('user');
    if (userData) {
      this.userDataSubject.next(JSON.parse(userData));
      this.user = JSON.parse(userData);
    }
  }

  userLogIn(data: IUser) {
    this.http
      .get<IUser>(
        `http://localhost:3000/user?Email=${data.Email}&Password=${data.Password}`,
        { observe: 'response' }
      )
      .subscribe((response: any) => {
        if (response?.body?.length) {
          let { Password, ...userData } = response.body[0];
          localStorage.setItem('user', JSON.stringify(userData));
          UserService.isUserAuthenticated = true;
          this.router.navigate(['/']);
          this.userDataSubject.next(userData);
        } else {
          this.isloginError.emit(true);
        }
      });
  }

  userLogOut() {
    localStorage.removeItem('user');
  }

  addProductInCart(data: IUserCartProduct) {
    this.http
      .get<IUserCartProduct[]>(
        `http://localhost:3000/localCart?userId=${this.user?.id}`
      )
      .subscribe((res) => {
        let currentProduct: any = res.filter((product) => {
          return product.cartProduct.id == data.cartProduct.id;
        });
        if (currentProduct.length != 0) {
          currentProduct[0].quantity = currentProduct[0].quantity + 1;
          this.http
            .put(
              `http://localhost:3000/localCart/${currentProduct[0].id}`,
              currentProduct[0]
            )
            .subscribe((res) => {});
        } else {
          this.http
            .post('http://localhost:3000/localCart', data)
            .subscribe((res) => {});
        }
      });
  }

  getUserCart() {
    return this.http.get<IUserCartProduct[]>('http://localhost:3000/localCart');
  }

  getUserCartProduct(userId: number | undefined, productId: number) {
    return this.http.get<any>(
      `http://localhost:3000/localCart?userId=${userId}&cartProduct.id=${productId}`
    );
  }

  userCartEmitterMethod() {
    this.getUserCart().subscribe((res) => {
      this.userCartSubject.next(res);
    });
  }

  deleteProductFromUserCart(id: number) {
    return this.http.delete(`http://localhost:3000/localCart/${id}`);
  }

  updateProductCartQuantity(data: any, addProductQuantityConfirm: boolean) {
    if (addProductQuantityConfirm) {
      data.quantity = data.quantity + 1;
    } else {
      if (data.quantity == 1) {
        return this.deleteProductFromUserCart(data.id);
      }
      data.quantity = data.quantity - 1;
    }

    return this.http.put(`http://localhost:3000/localCart/${data.id}`, data);
  }

  userCartOrder(data: IUserCartProduct[] | null) {
    const userId: number | null | undefined = data && data[0].userId;
    const date: string = new Date().toDateString();
    const userOrder: IUserOrder = {
      id: null,
      userId: userId,
      date: date,
      cartOrder: data,
    };

    return this.http.post(`http://localhost:3000/userOrders`, userOrder);
  }

  getUserOrders(userId: number | undefined) {
    return this.http.get<IUserOrder[]>(
      `http://localhost:3000/userOrders?userId=${userId}`
    );
  }

  emptyCartRequest(userCart: IUserCartProduct[] | null) {
    userCart?.forEach((cartProduct) => {
      this.http
        .delete(`http://localhost:3000/localCart/${cartProduct.id}`)
        .subscribe((res) => {});
    });
  }

  updateUserProfile(userId: string | undefined, data: IUser | null) {
    return this.http.put(`http://localhost:3000/user/${userId}`, data);
  }

  resetUserPassword(user: IUser) {
    return this.http.put(`http://localhost:3000/user/${user.id}`, user);
  }

  initialUserWishList(wishList: IUserWishList) {
    return this.http.post(`http://localhost:3000/wishListOfUsers`, wishList);
  }

  getUserWishlist(userId: number | undefined) {
    return this.http.get<IUserWishList>(
      `http://localhost:3000/wishListOfUsers?userId=${userId}`
    );
  }

  addProductInUserWishlist(
    userId: number | undefined,
    product: ISellerProduct
  ) {
    this.getUserWishlist(userId).subscribe((userWishList: any) => {
      userWishList[0].products.push(product);
      this.http
        .put(
          `http://localhost:3000/wishListOfUsers/${userWishList[0].id}`,
          userWishList[0]
        )
        .subscribe((res) => {});
    });
  }

  removeProductFromUserWishlist(
    userId: number | undefined,
    product: ISellerProduct
  ) {
    this.getUserWishlist(userId).subscribe((userWishList: any) => {
      const arr = userWishList[0].products.filter(
        (p: ISellerProduct) => p.id != product.id
      );
      userWishList[0].products = arr;

      this.http
        .put(
          `http://localhost:3000/wishListOfUsers/${userWishList[0].id}`,
          userWishList[0]
        )
        .subscribe((res) => {});
    });
  }
}
