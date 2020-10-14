import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Common } from '../../../services/common';
import { User } from '../../../models/user';
import { Subscription } from 'rxjs';

@Component({
    selector:'app-user-post',
    templateUrl:'./user-post.component.html',
    styleUrls:['user-post.component.html']
})

export class UserPostComponent implements OnInit, OnDestroy{
    public user:User; 
    public isLoading:Boolean;   
    private userDataSub = new Subscription();
    private loadingSub = new Subscription();
    constructor(private userService:UserService,
                private common:Common){

    }

    ngOnInit(){
        this.user = this.userService.copyUserInfo();
        this.isLoading = false;

        this.userDataSub = this.userService.getUserDataObservable()
        .subscribe((user:User)=>{
            this.user = user;
        });

        this.loadingSub = this.common.isLoadingAsObservable()
        .subscribe((status:Boolean)=>{
            this.isLoading = status;
        })
    }

    ngOnDestroy(){
        this.userDataSub.unsubscribe();
        this.loadingSub.unsubscribe();
    }

    updateUser(form){        
        if(form.invalid){
            alert('No pueden haber campos vacios')
            return;
        }
        this.common.changeIsLoading(true);
        this.userService.updateUser(form.value);
    }

}