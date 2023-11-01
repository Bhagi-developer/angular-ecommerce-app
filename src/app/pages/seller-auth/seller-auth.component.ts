import { JsonPipe } from '@angular/common';
import { Component,  OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IsellerDataType } from 'src/app/data-type';
import { IsellerLoginDataType } from 'src/app/data-type';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {

  emailPattern:RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  invalidSubmission:boolean= false;
  loginPage:boolean= false;
  wrongLoginCredentialSubmission:boolean= false;

  constructor(private sellerService:SellerService, private route:Router){}

  ngOnInit(): void {
     if(SellerService.isSellerAuthenticated)
     {
      this.route.navigate(['/seller-home']);
     }
  }

  toggelLoginSignup(){
    this.loginPage= !this.loginPage;
  }

  onSubmit(sellerFormData:NgForm)
  {
    //if fields are invalid
    if(!sellerFormData.valid || !this.emailPattern.test(sellerFormData.value.Email))
    {
      this.invalidSubmission= true;
    }
    else
    {
      this.invalidSubmission= false;
     
      //handle login 
      if(this.loginPage)
      {
        let res=this.sellerService.sellerLogIn(sellerFormData.value);
        
        this.sellerService.isloginError.subscribe((error)=>{
          if(error)
          {
            this.wrongLoginCredentialSubmission= true;
          }
        })
      }

      //handle sign up
      else
      {
        this.sellerService.sellerSignUp(sellerFormData.value).subscribe((res)=>{
          if(res)
          {
            this.loginPage= true;
            sellerFormData.reset();
          }
        })
      }
  }
}
}