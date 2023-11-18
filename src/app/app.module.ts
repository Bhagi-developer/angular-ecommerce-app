import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { SellerAuthComponent } from './pages/seller-auth/seller-auth.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SellerHomeComponent } from './pages/seller-home/seller-home.component';
import { NoContentComponent } from './pages/no-content/no-content.component';
import { SellerAddProductComponent } from './pages/seller-add-product/seller-add-product.component';
import { SellerProductComponent } from './pages/seller-product/seller-product.component';
import { SellerUpdateProductComponent } from './pages/seller-update-product/seller-update-product.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ProductComponent } from './pages/product/product.component';
import { SellerStoreComponent } from './pages/seller-store/seller-store.component';
import { UserAuthComponent } from './pages/user-auth/user-auth.component';
import { UserCartComponent } from './pages/user-cart/user-cart.component';
import { ScrollerComponent } from './pages/scroller/scroller.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UserOrdersComponent } from './pages/user-orders/user-orders.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SellerAuthComponent,
    SellerHomeComponent,
    NoContentComponent,
    SellerAddProductComponent,
    SellerProductComponent,
    SellerUpdateProductComponent,
    ProductComponent,
    SellerStoreComponent,
    UserAuthComponent,
    UserCartComponent,
    ScrollerComponent,
    UserOrdersComponent,
    UserProfileComponent,
  ],
  imports: [
    MatSnackBarModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
