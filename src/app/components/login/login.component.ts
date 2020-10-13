import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
    selector:'app-login',
    templateUrl:'./login.component.html',
    styleUrls:['./login.component.css']
})

export class LoginComponent implements OnDestroy{


    constructor(public authService:AuthService){

    };

    onSubmit(form){          
        this.authService.login(form.value);
    }

    ngOnDestroy(){
        this.authService.loginFailed = ""
    }
}