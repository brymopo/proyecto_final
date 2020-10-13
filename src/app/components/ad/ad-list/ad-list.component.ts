import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ad } from '../../../models/ad';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { AdService } from '../../../services/ad.service';
import { Subscription } from 'rxjs';

@Component({
    selector:'app-ad-list',
    templateUrl:'./ad-list.component.html',
    styleUrls:['./ad-list.component.css']
})

export class AdListComponent implements OnInit, OnDestroy{
    public ads:Ad[];
    private userSub = new Subscription();

    constructor(private userService:UserService,
                private adService:AdService){

    }
    
    ngOnInit(){
        this.ads = this.userService.copyUserInfo().ads;
        this.userSub = this.userService.getUserDataObservable()
        .subscribe((user:User)=>{
            this.ads = user.ads
        })
    }

    ngOnDestroy(){
        if(this.userSub){
            this.userSub.unsubscribe()
        }
    }

    onDelete(id:String){
        this.adService.deleteAds(id);
    }   

}