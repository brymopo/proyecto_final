import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Common } from '../../services/common';
import { Subscription } from 'rxjs';

@Component({
    selector:'app-login',
    templateUrl:'./login.component.html',
    styleUrls:['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy{
    public isLoading:Boolean;
    private loadingSub = new Subscription();

    constructor(public authService:AuthService,
                public common:Common){

    };

    onSubmit(form){
        this.common.changeIsLoading(true);                
        this.authService.login(form.value);           
    }

    ngOnInit(){
        this.isLoading = false;
        this.loadingSub = this.common.isLoadingAsObservable()
        .subscribe((status:Boolean)=>{
            this.isLoading = status;
        })
    }

    ngOnDestroy(){
        this.authService.loginFailed = "";
        this.loadingSub.unsubscribe();
    }

    rememberMe(event){
        console.log(event.target.value);
    }
}