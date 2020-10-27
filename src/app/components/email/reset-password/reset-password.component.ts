import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  private token:string;
  public mode:string = "";

  constructor(private route:ActivatedRoute,
              private authService:AuthService) { }

  ngOnInit(): void {
      this.route.paramMap.subscribe((paramMap:ParamMap)=>{
        this.token = paramMap.get('token');
        if(!this.token){
          this.mode = 'change'
        }
      })
  }

  onSubmit(form){
    if(!this.mode.length){
      this.authService.resetPasswordWithToken(form.value,this.token);
    }else{
      form.value.requestId = JSON.parse(localStorage.getItem('loginInfo')).requestId;
      this.authService.changePasswordBy2fa(form.value);
    }
    
  }

  formHeaderText(){
    if(!this.mode.length){
      return 'Reestablecer Clave'
    }
    return 'Cambiar Clave'
  }

}