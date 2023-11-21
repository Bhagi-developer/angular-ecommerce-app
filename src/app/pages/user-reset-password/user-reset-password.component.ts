import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/data-type';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-reset-password',
  templateUrl: './user-reset-password.component.html',
  styleUrls: ['./user-reset-password.component.css'],
})
export class UserResetPasswordComponent {
  invalidForm: boolean = false;
  passwordMisMatch: boolean = false;
  user: IUser | null = null;
  passwordPattern: RegExp =
    /^(?=.*[0-9])(?=.*[!@#$%^&*()_+|~\-={}\[\]:;"'<>,.?\\/])(?=.*[a-zA-Z]).{8,}$/;
  weakPasswordWarn: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.userService.userDataEmitter.subscribe((res) => {
      this.user = res;
    });
  }

  validateForm(form: NgForm): boolean {
    if (form.invalid) {
      this.invalidForm = true;
      return false;
    } else {
      this.invalidForm = false;
      if (form.value.Password != form.value.ConfirmPassword) {
        this.passwordMisMatch = true;
        return false;
      } else {
        this.passwordMisMatch = false;
        if (this.passwordPattern.test(form.value.Password)) {
          this.weakPasswordWarn = false;
          return true;
        } else {
          this.weakPasswordWarn = true;
          return false;
        }
      }
    }
  }

  onSubmit(form: NgForm) {
    if (this.validateForm(form)) {
      // this.userService.
      if (this.user?.Password) {
        this.user.Password = form.value.Password;
        this.userService.resetUserPassword(this.user).subscribe((res) => {
          localStorage.setItem('user', JSON.stringify(res));
          if (res) {
            this._snackBar.open(
              'Success! Your password is updated! ✌🏼',
              'Dismiss',
              {
                duration: 3000, // Duration in milliseconds
                horizontalPosition: 'end', // Display on the right
                verticalPosition: 'top', // Display at the top
                panelClass: ['custom-snack-bar'],
              }
            );
            this.router.navigate(['/user-profile']);
          }
        });
      }
    }
  }
}
