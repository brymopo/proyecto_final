import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ad } from '../../../models/ad';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { AdService } from '../../../services/ad.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
    selector:'app-ad-list',
    templateUrl:'./ad-list.component.html',
    styleUrls:['./ad-list.component.css']
})

export class AdListComponent implements OnInit, OnDestroy{
    public ads:Ad[];
    public mode:String;
    private userSub = new Subscription();
    private adSub = new Subscription();

    constructor(private userService:UserService,
                private adService:AdService,
                private route:ActivatedRoute){

    }
    
    ngOnInit(){
        this.route.paramMap.subscribe((paramMap:ParamMap)=>{
            this.mode = paramMap.get('mode');
            if(this.mode==='mis_anuncios'){
                this.ads = this.userService.copyUserInfo().ads;
                this.userSub = this.userService.getUserDataObservable()
                .subscribe((user:User)=>{
                    this.ads = user.ads
                })
            };
            if(this.mode==='todos'){
                this.adService.getAllAds();
                this.adSub = this.adService.getAllAdsAsObservable()
                .subscribe((ads:Ad[])=>{
                    this.ads = ads;
                    console.log(ads)
                })
            }
            
        })
        
    }

    ngOnDestroy(){
        if(this.userSub){
            this.userSub.unsubscribe();
        }

        if(this.adSub){
            this.adSub.unsubscribe();
        }
    }

    onDelete(id:String){
        this.adService.deleteAds(id);
    } 
    
    ownAds(){
        return this.mode==='mis_anuncios'
    }

}