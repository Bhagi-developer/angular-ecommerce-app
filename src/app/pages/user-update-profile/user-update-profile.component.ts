import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUser } from 'src/app/data-type';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-update-profile',
  templateUrl: './user-update-profile.component.html',
  styleUrls: ['./user-update-profile.component.css'],
})
export class UserUpdateProfileComponent {
  invalidForm: boolean = false;
  emptyForm: boolean = false;
  user: IUser | null = null;

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

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.invalidForm = true;
    } else {
      this.invalidForm = false;

      if (form.pristine) {
        this.emptyForm = true;
      } else {
        this.emptyForm = false;

        if (form.value.FName.trim() !== '') {
          if (this.user && this.user.FName !== undefined) {
            this.user.FName = form.value.FName;
          }
        }

        if (form.value.LName.trim() !== '') {
          if (this.user && this.user.LName !== undefined) {
            this.user.LName = form.value.LName;
          }
        }

        if (form.value.Email.trim() !== '') {
          if (this.user && this.user.Email !== undefined) {
            this.user.Email = form.value.Email;
          }
        }

        this.userService
          .updateUserProfile(this.user?.id.toString(), this.user)
          .subscribe((res) => {
            if (res) {
              localStorage.setItem('user', JSON.stringify(res));

              this._snackBar.open(
                'Success! Your profile is updated! ✌🏼',
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
