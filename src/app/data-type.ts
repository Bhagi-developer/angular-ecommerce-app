export interface IUser {
  Id: number;
  FName: string;
  LName: string;
  Email: string;
  Password: string;
}

export interface IsellerDataType {
  FName: string;
  LName: string;
  StoreName: string;
  Email: string;
  Password: string;
  id: number;
}

export interface ISellerSignupDataType {
  FName: string;
  LName: string;
  StoreName: string;
  Email: string;
  Password: string;
}

export interface IsellerLoginDataType {
  Email: string;
  Password: string;
}

export default interface ISellerProduct {
  SellerId: number;
  StoreName: string;
  Name: string;
  Price: number;
  Category: string;
  Quantity: number;
  PaymentMethod: string;
  ListProduct: boolean;
  id: number;
}
