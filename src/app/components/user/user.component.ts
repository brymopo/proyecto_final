import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Subscription } from 'rxjs';

@Component({
    selector:'app-user',
    templateUrl:'./user.component.html'    
})

export class UserComponent implements OnInit, OnDestroy{
    public user:User;
    
    private userDataSub = new Subscription();
   

    constructor(private userService:UserService){

    }

    ngOnInit(){     

        this.user = this.userService.copyUserInfo();            
        
        this.userDataSub = this.userService.getUserDataObservable().subscribe((user:User)=>{
            this.user = user;
        })        
    }

    ngOnDestroy(){
        this.userDataSub.unsubscribe();        
    }
        
}