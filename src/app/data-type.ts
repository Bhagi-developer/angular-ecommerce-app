export interface IsellerDataType
{
    FName:string,
    LName:string,
    StoreName:string,
    Email:string,
    Password:string,
    id:number
}

export interface ISellerSignupDataType{
    FName:string,
    LName:string,
    StoreName:string,
    Email:string,
    Password:string
}

export interface IsellerLoginDataType
{
    Email:string,
    Password:string
}

export default interface ISellerProduct
{
    SellerId:number,
    Name:string,
    Price:number,
    Category:string,
    Quantity:number,
    PaymentMethod:string,
    ListProduct:boolean,
    id:number
}