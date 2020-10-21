import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-two-facomponent',
  templateUrl: './two-facomponent.component.html',
  styleUrls: ['./two-facomponent.component.css']
})
export class TwoFAComponentComponent implements OnInit {
  public requestId:string;
  public form2FA:FormGroup;

  constructor(
              private formBuilder:FormBuilder,
              private authService:AuthService
              ) {
      this.validator();
  }

  ngOnInit(): void {
    
  }

  validator(){
    const data =  JSON.parse(localStorage.getItem('loginInfo'));

    this.form2FA = this.formBuilder.group({
      code:["",Validators.required],
      requestId:data.requestId,
      userId:data.userId
    })
  }

  verifyCode(){
    console.log(this.form2FA.value);
    this.authService.validate2FA(this.form2FA.value);
  }

}
