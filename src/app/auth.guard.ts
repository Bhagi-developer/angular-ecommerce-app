import { CanActivateFn } from '@angular/router';
import { SellerService } from './services/seller.service';
import { ProductService } from './services/product.service';
import { UserService } from './services/user.service';

export const sellerAuthGuard: CanActivateFn = (route, state) => {
  return SellerService.isSellerAuthenticated;
};

export const userAuthGuard: CanActivateFn = (route, state) => {
  return UserService.isUserAuthenticated;
};
