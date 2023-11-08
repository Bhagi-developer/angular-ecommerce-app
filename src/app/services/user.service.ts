import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { IsellerDataType } from '../data-type';
import { IUser } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userDataSubject = new BehaviorSubject<IUser | null>(null);
  userDataEmitter = this.userDataSubject.asObservable();

  isloginError = new EventEmitter<boolean>(false);
  static isUserAuthenticated: boolean = false;

  constructor(private http: HttpClient, private router: Router) {
    let userData = localStorage.getItem('user');
    if (userData) {
      UserService.isUserAuthenticated = true;
    } else {
      UserService.isUserAuthenticated = false;
    }
  }

  userSignUp(data: IUser) {
    return this.http.post('http://localhost:3000/user', data);
  }

  userDataEmit() {
    let userData = localStorage.getItem('user');
    if (userData) {
      this.userDataSubject.next(JSON.parse(userData));
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
          localStorage.setItem('user', JSON.stringify(response.body[0]));
          UserService.isUserAuthenticated = true;
          this.router.navigate(['/']);
          this.userDataSubject.next(response.body[0]);
        } else {
          this.isloginError.emit(true);
        }
      });
  }
}
