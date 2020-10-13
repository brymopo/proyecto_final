import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Ad } from '../../../models/ad';
import { AdService } from '../../../services/ad.service';
import { AdminService } from '../../../services/admin.service';
import { Subscription } from 'rxjs';

@Component({
    selector:'app-ad-show',
    templateUrl:'./ad-show.component.html',
    styleUrls:['./ad-show.component.css']
})

export class AdShowComponent implements OnInit, OnDestroy{ 
    public ad:Ad;
    private adSub = new Subscription();
    public admin:Boolean;

    constructor(private route:ActivatedRoute,
                private adService:AdService,
                private adminService:AdminService){

    }

    ngOnInit(){
        this.ad = new Ad();
        this.admin = this.adminService.isAdmin();
        this.route.paramMap
        .subscribe((paramMap:ParamMap)=>{
            const id = paramMap.get('adId');
            this.adService.getOneAdPopulated(id);
            this.adSub = this.adService.getOneAdAsObservable()
            .subscribe((add:Ad)=>{
                this.ad = add;
            })
        })
        
    }

    onReport(){
        this.adminService.reportAd(this.ad._id);
    }

    deleteByAdmin(id:String){
        this.adminService.deleteReportedAd(id);
    }

    ngOnDestroy(){
        this.adSub.unsubscribe();
    }
}