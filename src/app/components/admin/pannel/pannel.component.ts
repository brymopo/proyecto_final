import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Subscription } from 'rxjs';
import { Ad } from '../../../models/ad';
import { Admin } from '../../../models/admin';
import { fade } from '../../../animation';

@Component({
    selector:'app-pannel',
    templateUrl:'./pannel.component.html',
    styleUrls:['./pannel.component.css'],
    animations:[fade]
})

export class PannelComponent implements OnInit, OnDestroy{
    public reportedAds:Ad[];
    public userInfo
    private userSub = new Subscription();

    constructor(private userService:UserService){

    }

    ngOnInit(){
        
        this.userInfo = this.userService.copyUserInfo();
        this.reportedAds = this.userInfo.reportedAds;
        console.log('User info: ',this.userInfo);
        this.userSub = this.userService.getUserDataObservable()
        .subscribe((admin:Admin)=>{
            
            this.reportedAds = admin.reportedAds
        })
    }

    ngOnDestroy(){
        this.userSub.unsubscribe()
    }
}