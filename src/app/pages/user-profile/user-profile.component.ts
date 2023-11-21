import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/data-type';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent {
  user: IUser | null = null;
  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    // this.userService.userDataEmit();
    this.userService.userDataEmitter.subscribe((res) => {
      this.user = res;
    });
  }

  userLogOut() {
    localStorage.removeItem('user');
    UserService.isUserAuthenticated = false;
    this.router.navigate(['/user-auth']);
  }

  navigateUpdateProfilePage() {
    this.router.navigate(['/user-update-profile']);
  }

  navigateResetPasswordPage() {
    this.router.navigate(['/user-reset-password']);
  }
}
