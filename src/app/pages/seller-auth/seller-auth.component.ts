import { JsonPipe } from '@angular/common';
import { Component,  OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { sellerDataType } from 'src/app/data-type';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {

  emailPattern:RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  invalidSubmission:boolean= false;

  constructor(private sellerService:SellerService, private route:Router){}

  ngOnInit(): void {
     if(SellerService.isSellerAuthenticated)
     {
      this.route.navigate(['/seller-home']);
     }
  }

  onSubmit(sellerSignUpForm:NgForm)
  {
    if(!sellerSignUpForm.valid || !this.emailPattern.test(sellerSignUpForm.value.Email))
    {
      this.invalidSubmission= true;
    }
    else
    {
      this.invalidSubmission= false;
     
      this.sellerService.sellerSignUp(sellerSignUpForm.value).subscribe((res)=>{
        if(res)
        {
          localStorage.setItem('seller', JSON.stringify(res));
          SellerService.isSellerAuthenticated= true;
          this.route.navigate(['/seller-home']);
        }
        else{
          this.route.navigate(["/"]);
        }
      })
  }
}
}
