import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
    selector:'app-signup',
    templateUrl:'./signup.component.html',
    styleUrls:['./signup.component.css']
})

export class SignupComponent implements OnDestroy{
    
    passwordMisMatch:Boolean=false;

    constructor(public authService:AuthService){

    }

    isPasswordMatch(form){        
        return form.value.password === form.value.passwordRepeat;        
    };

    onSignUp(form){              
        this.passwordMisMatch = !this.isPasswordMatch(form);

        if(this.passwordMisMatch){            
            return;
        }
        
        console.log(form.value);
        this.authService.signUp(form.value)
    }

    ngOnDestroy(){
        
    }

}