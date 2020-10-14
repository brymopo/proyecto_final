import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Common } from '../../services/common';
import { Subscription } from 'rxjs';


@Component({
    selector:'app-signup',
    templateUrl:'./signup.component.html',
    styleUrls:['./signup.component.css']
})

export class SignupComponent implements OnInit, OnDestroy{
    
    public passwordMisMatch:Boolean;
    public isLoading:Boolean;
    private loadingSub = new Subscription();

    constructor(public authService:AuthService,
                private common:Common){

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
        this.common.changeIsLoading(true);
        this.authService.signUp(form.value)
    }

    ngOnInit(){
        this.passwordMisMatch = false;
        this.isLoading = false;
        this.loadingSub = this.common.isLoadingAsObservable()
        .subscribe((status:Boolean)=>{
            this.isLoading = status;
        })
    }

    ngOnDestroy(){
        this.loadingSub.unsubscribe();
    }

}