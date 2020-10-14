import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { Subscription } from 'rxjs';


@Component({
    selector:'app-profile',
    templateUrl:'./profile.component.html',
    styleUrls:['./profile.component.css']
})

export class ProfileComponent implements OnInit,OnDestroy{   
    /**
     * Copy of the userInfo object of User Service; contains all user's data.
     * @property userInfo
     */

    public userInfo:User;
    public isLoading:Boolean;   
    private userSub = new Subscription();    

    constructor(private userService:UserService,
                private authService:AuthService,
                private router:Router){

    }    

    ngOnInit(){
        this.isLoading = true;

        if(this.authService.isLoggedIn()){
            this.userInfo = new User();
            this.userService.getUserData();
            this.userSub = this.userService.getUserDataObservable()
            .subscribe((user:User)=>{
                this.userInfo = user;
                console.log("user info changed: ",user);
                this.isLoading = false;
                this.router.navigateByUrl('mi_perfil/usuario');           
            })
        }
        
    }

    ngOnDestroy(){        
        this.userSub.unsubscribe();       
    }

    isLoggedIn(){
        return this.authService.isLoggedIn();
    }    
}