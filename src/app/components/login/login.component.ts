import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fade } from '../../animation';

@Component({
    selector:'app-login',
    templateUrl:'./login.component.html',
    styleUrls:['./login.component.css'],
    animations:[fade]
})

export class LoginComponent{
    public isLoading = false;
    public loginFailed="";    
    public loginForm:FormGroup;

    constructor(public authService:AuthService,                
                private formBuilder:FormBuilder,
                private router:Router){
                this.validator();
    };

    onSubmit(){
        if(!this.loginForm.valid){
            this.loginFailed = 'Se deben llenar todos los campos'
            return;
        }        
        this.handleLogin(this.loginForm.value);             
    }

    validator(){
        this.loginForm = this.formBuilder.group({
            username:['',Validators.required],
            password:['',Validators.required],
            remember:[false]

        })
    }    

    handleLogin(form){
        this.isLoading = true;
        this.authService.login(form).subscribe(res=>{
            if(res.success){                
                localStorage.setItem('loginInfo',JSON.stringify(res.result));
                this.router.navigateByUrl('iniciarsesion/2fa');
            }
        },(err)=>{
            this.isLoading = false;
            this.loginFailed = err.error.result;                       
        })
    }
}