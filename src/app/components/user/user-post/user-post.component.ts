import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { Subscription } from 'rxjs';

@Component({
    selector:'app-user-post',
    templateUrl:'./user-post.component.html',
    styleUrls:['user-post.component.html']
})

export class UserPostComponent implements OnInit{
    public user:User;    
    private userDataSub = new Subscription();
    constructor(private userService:UserService){

    }

    ngOnInit(){
        this.user = this.userService.copyUserInfo();
        this.userDataSub = this.userService.getUserDataObservable()
        .subscribe((user:User)=>{
            this.user = user;
        })
    }

    updateUser(form){        
        if(form.invalid){
            alert('No pueden haber campos vacios')
            return;
        }
        this.userService.updateUser(form.value);
    }

}