import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SellerAuthComponent } from './pages/seller-auth/seller-auth.component';
import { SellerHomeComponent } from './pages/seller-home/seller-home.component';
import { NoContentComponent } from './pages/no-content/no-content.component';
import { sellerAuthGuard, userAuthGuard } from './auth.guard';
import { SellerAddProductComponent } from './pages/seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './pages/seller-update-product/seller-update-product.component';
import { ProductComponent } from './pages/product/product.component';
import { SellerStoreComponent } from './pages/seller-store/seller-store.component';
import { UserAuthComponent } from './pages/user-auth/user-auth.component';
import { UserCartComponent } from './pages/user-cart/user-cart.component';
import { UserOrdersComponent } from './pages/user-orders/user-orders.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { UserUpdateProfileComponent } from './pages/user-update-profile/user-update-profile.component';
import { UserResetPasswordComponent } from './pages/user-reset-password/user-reset-password.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'seller-auth',
    component: SellerAuthComponent,
  },
  {
    path: 'seller-home',
    component: SellerHomeComponent,
    canActivate: [sellerAuthGuard],
  },
  {
    path: 'seller-add-product',
    component: SellerAddProductComponent,
    canActivate: [sellerAuthGuard],
  },
  {
    path: 'seller-update-product/:id',
    component: SellerUpdateProductComponent,
    canActivate: [sellerAuthGuard],
  },
  {
    path: 'product/:id',
    component: ProductComponent,
    canActivate: [userAuthGuard],
  },
  {
    path: 'store/:sellerId',
    component: SellerStoreComponent,
  },
  {
    path: 'user-auth',
    component: UserAuthComponent,
  },
  {
    path: 'user-cart',
    component: UserCartComponent,
    canActivate: [userAuthGuard],
  },
  {
    path: 'user-orders',
    component: UserOrdersComponent,
    canActivate: [userAuthGuard],
  },
  {
    path: 'user-profile',
    component: UserProfileComponent,
    canActivate: [userAuthGuard],
  },
  {
    path: 'user-update-profile',
    component: UserUpdateProfileComponent,
    canActivate: [userAuthGuard],
  },
  {
    path: 'user-reset-password',
    component: UserResetPasswordComponent,
    canActivate: [userAuthGuard],
  },
  {
    path: '**',
    component: NoContentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
