import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SellerAuthComponent } from './pages/seller-auth/seller-auth.component';
import { SellerHomeComponent } from './pages/seller-home/seller-home.component';
import { NoContentComponent } from './pages/no-content/no-content.component';
import { authGuard } from './auth.guard';
import { SellerAddProductComponent } from './pages/seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './pages/seller-update-product/seller-update-product.component';
import { ProductComponent } from './pages/product/product.component';
import { SellerStoreComponent } from './pages/seller-store/seller-store.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'seller-auth',
    component:SellerAuthComponent
  },
  {
    path:'seller-home',
    component:SellerHomeComponent,
    canActivate:[authGuard]
  },
  {
    path:'seller-add-product',
    component:SellerAddProductComponent,
    canActivate:[authGuard]
  },
  {
    path:'seller-update-product/:id',
    component:SellerUpdateProductComponent,
    canActivate:[authGuard]
  },
  {
    path:'product/:id',
    component:ProductComponent,
    canActivate:[authGuard]
  },
  {
    path:'store/:sellerId',
    component:SellerStoreComponent
  },
  {
    path:"**",
    component: NoContentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }