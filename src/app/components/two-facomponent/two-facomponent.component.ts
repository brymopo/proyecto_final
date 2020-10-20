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
    this.form2FA = this.formBuilder.group({
      code:[" ",Validators.required],
      requestId:localStorage.getItem('requestId')
    })
  }

  verifyCode(){
    this.authService.validate2FA(this.form2FA.value);
  }

}
