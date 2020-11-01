import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { Subscription } from 'rxjs';
import { fade } from '../../../animation';

@Component({
    selector:'app-user-post',
    templateUrl:'./user-post.component.html',
    styleUrls:['user-post.component.html'],
    animations:[fade]
})

export class UserPostComponent implements OnInit, OnDestroy{
    public user:User; 
    public isLoading:Boolean;   
    private userDataSub = new Subscription();
    public errorMessage= ""; 
    public feedback = "";   

    constructor(private userService:UserService){

    }

    ngOnInit(){
        this.user = this.userService.copyUserInfo();
        this.isLoading = false;

        this.userDataSub = this.userService.getUserDataObservable()
        .subscribe((user:User)=>{
            this.user = user;
        });        
    }

    ngOnDestroy(){
        this.userDataSub.unsubscribe();        
    }

    updateUser(form){        
        if(form.invalid){
            this.errorMessage = 'No pueden haber campos vacios';
            return;
        }
        this.isLoading = true;

        this.userService.updateUser(form.value).subscribe(res=>{
            this.userService.setUserInfo(res.result);
            this.isLoading = false;
            this.feedback = 'Se actualizo la informacion!'            
        },err=>{
            this.isLoading = false;
            this.errorMessage = err.error.result;            
        });
    }

    changePassword(){
        this.isLoading = true;
        this.userService.requestPasswordChangeCode();
    }

    onFormChange(){
        this.errorMessage = "";
        this.feedback = "";
    }

}