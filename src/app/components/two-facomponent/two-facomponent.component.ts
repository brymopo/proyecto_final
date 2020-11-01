import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { fade } from '../../animation'

@Component({
  selector: 'app-two-facomponent',
  templateUrl: './two-facomponent.component.html',
  styleUrls: ['./two-facomponent.component.css'],
  animations:[fade]
})
export class TwoFAComponentComponent implements OnInit {
  public requestId:string;
  public validating=false;
  public resending=false;
  public feedback="";
  public form2FA:FormGroup;

  constructor(
              private formBuilder:FormBuilder,
              private authService:AuthService,
              private router:Router
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
    if(!this.form2FA.valid){
        this.feedback = 'Debes introducir el codigo'
      return ;
    }

    this.validating = true;

    this.authService.validate2FA(this.form2FA.value).subscribe(res=>{
      if(res.success){
        this.authService.setLocalStorage(res.result);
        this.authService.isLoggedIn();
        this.router.navigateByUrl('mi_perfil');
      }
    },err=>{
      this.validating = false;
      this.feedback = err.error.result;
    })
  }

  resendCode(){
    this.resending = true;
    this.authService.resend2FACode({requestId:this.form2FA.value.requestId}).subscribe(res=>{
      if(res.success){        
        alert('El codigo se ha reenviado a tu telefono');
        this.resending = false;
      }
    },err=>{
      this.resending = false;
      this.feedback = err.error.result;
    });    
  }

}
