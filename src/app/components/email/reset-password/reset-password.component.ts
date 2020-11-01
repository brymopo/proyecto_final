import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { fade } from '../../../animation';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  animations:[fade]
})
export class ResetPasswordComponent implements OnInit {
  private token:string;
  public mode:string = "";
  public isLoading = false;
  public errorMessage = ''; 

  constructor(private route:ActivatedRoute,
              private authService:AuthService,
              private router:Router) { }

  ngOnInit(): void {
      this.route.paramMap.subscribe((paramMap:ParamMap)=>{
        this.token = paramMap.get('token');
        if(!this.token){
          this.mode = 'change'
        }
      })
  }

  validators(form){
    if(!form.valid){
      this.errorMessage = 'Todos los campos deben estar llenos';
      return false;
    }

    if(!this.validLength(form.value.newPassword)){
      this.errorMessage = 'La nueva clave debe ser de al menos 6 digitos';
      return false;
    }

    if(!this.passwordMatch(form.value)){
      this.errorMessage = 'Las claves no coinciden. Por favor verifica';
      return false;
    }
    return true;
  }

  onSubmit(form){
    if(!this.validators(form)){
      return ;
    }

    this.isLoading = true;

    if(!this.mode.length){
      this.handleResetByEmail(form.value,this.token);
    }else{
      this.handleResetBy2FA(form.value);
    }
    
  }

  handleResetByEmail(form,token){
    this.authService.resetPasswordByEmail(form,token).subscribe(res=>{
      if(res.success){
          alert('Clave reestablecida!');
          this.router.navigateByUrl('iniciarsesion');
      }
    },err=>{
      this.isLoading = false;
      this.errorMessage = err.error.result;
    })
  }

  handleResetBy2FA(form){
    form.requestId = localStorage.getItem('loginInfo');
    this.authService.changePasswordBy2fa(form).subscribe(res=>{
      if(res.success){
        alert('Clave cambiada con exito');
        this.router.navigateByUrl('mi_perfil');
      }
    },err=>{
      this.isLoading = false;
      this.errorMessage = err.error.result;
    });
  }


  
  


  validLength(newPassword){    
    return newPassword.length >= 6;
  }

  passwordMatch(form){
    return form.newPassword === form.confirmPassword
  }

  formHeaderText(){
    if(!this.mode.length){
      return 'Reestablecer Clave'
    }
    return 'Cambiar Clave'
  }

}
