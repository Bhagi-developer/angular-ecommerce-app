import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { IUser } from 'src/app/data-type';

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

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    if (form.invalid || !this.emailPattern.test(form.value.Email)) {
      this.invalidSubmission = true;
    } else {
      if (this.loginPage) {
        this.userService.userLogIn(form.value);
        this.userService.isloginError.subscribe((res) => {
          this.wrongLoginCredentialSubmission = true;
        });
      } else {
        this.userService.userSignUp(form.value).subscribe((res) => {
          if (res) {
            form.reset();
            this.loginPage = true;
          }
        });
      }
    }
  }

  toggelLoginSignup() {
    this.loginPage = !this.loginPage;
  }
}
