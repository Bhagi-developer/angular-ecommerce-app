import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { IUser, IUserWishList } from 'src/app/data-type';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent {
  loginPage: boolean = true;
  invalidSubmission: boolean = false;
  wrongLoginCredentialSubmission: boolean = false;
  emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  passwordPattern: RegExp =
    /^(?=.*[0-9])(?=.*[!@#$%^&*()_+|~\-={}\[\]:;"'<>,.?\\/])(?=.*[a-zA-Z]).{8,}$/;
  weakPasswordWarn: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    if (form.invalid || !this.emailPattern.test(form.value.Email)) {
      this.invalidSubmission = true;
    } else {
      this.weakPasswordWarn = false;
      if (this.loginPage) {
        this.userService.userLogIn(form.value);
        this.userService.isloginError.subscribe((res) => {
          this.wrongLoginCredentialSubmission = true;
        });
      } else {
        if (this.passwordPattern.test(form.value.Password)) {
          this.weakPasswordWarn = false;
          this.userService.userSignUp(form.value).subscribe((res: IUser) => {
            if (res) {
              form.reset();
              this.loginPage = true;
            }
            const userWishList: IUserWishList = {
              id: null,
              userId: res.id,
              products: [],
            };
            this.userService
              .initialUserWishList(userWishList)
              .subscribe((res) => {
                //initial user wishlist created
              });
          });
        } else {
          this.weakPasswordWarn = true;
        }
      }
    }
  }

  toggelLoginSignup() {
    this.loginPage = !this.loginPage;
  }
}
