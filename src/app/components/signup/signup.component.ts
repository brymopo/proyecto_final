import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fade } from '../../animation'

@Component({
    selector:'app-signup',
    templateUrl:'./signup.component.html',
    styleUrls:['./signup.component.css'],
    animations:[fade]
})

export class SignupComponent{
    public signUpForm:FormGroup;
    public errorMessage = '';    
    public isLoading=false;
    

    constructor(public authService:AuthService,
                private router:Router,
                private formBuilder:FormBuilder){
                    this.validator();
    }

    validator(){
        this.signUpForm =  this.formBuilder.group({
            username:['',Validators.required],
            firstName:['',Validators.required],
            lastName:['',Validators.required],
            email:['',[Validators.required, Validators.email]],
            phone:['',[Validators.required,this.phoneValidator]],
            password:['',[Validators.required, Validators.minLength(6)]],
            passwordRepeat:['',Validators.required],
        },{validators:this.passwordMatch})
    }

    phoneValidator(control:AbstractControl){
        let phone = String(control.value);
        if(phone.length !== 10){
            return {badLength:true}
        }
        if(phone[0] !== "3"){
            return {wrongPrefix:true}
        }
    }   

    passwordMatch:ValidatorFn = (control:AbstractControl):ValidationErrors=>{
        //Cross-field validator
        let password = control.get('password');
        let passwordRepeat = control.get('passwordRepeat');
        
        if( passwordRepeat.dirty && password.value !== passwordRepeat.value){
            return {passwordMatch:true}
        }
    }

    onSubmit(){
        if(!this.signUpForm.valid){
            this.errorMessage = 'Hay uno o mas errores en el formulario'
            return; 
        }
        
        this.isLoading = true;

        this.handleSignUp(this.signUpForm.value);
        
    }
    
    handleSignUp(form){
        this.errorMessage = "";
        this.authService.signUp(form).subscribe(res=>{
            if(res.success){                
                this.router.navigateByUrl('validar_email');                
            };
        },err=>{
            this.isLoading = false;
            this.errorMessage = err.message;
        })
    }

}