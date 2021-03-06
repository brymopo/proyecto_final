import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Ad } from '../../../models/ad';
import { AdService } from '../../../services/ad.service';
import { AdminService } from '../../../services/admin.service';
import { UserService } from '../../../services/user.service';
import { Subscription } from 'rxjs';
import * as moment from "moment";
import { fade } from '../../../animation';

@Component({
    selector:'app-ad-show',
    templateUrl:'./ad-show.component.html',
    styleUrls:['./ad-show.component.css'],
    animations:[fade]
})

export class AdShowComponent implements OnInit, OnDestroy{ 
    public ad:Ad;
    public ownAd:Boolean;
    public loading:boolean;
    private adSub = new Subscription();
    public admin:Boolean;
    public deleting = false;
    public adDeleted = false;
    public errorMessage="";

    constructor(private route:ActivatedRoute,
                private adService:AdService,
                private adminService:AdminService,
                private userService:UserService){

    }

    ngOnInit(){
        this.loading = true;
        this.ad = new Ad();
        this.admin = this.adminService.isAdmin();
        this.route.paramMap
        .subscribe((paramMap:ParamMap)=>{
            const id = paramMap.get('adId');
            this.adService.getOneAdPopulated(id);
            this.adSub = this.adService.getOneAdAsObservable()
            .subscribe((add:Ad)=>{                
                this.loading = false;
                if(!add){
                    return;
                }
                this.ad = add;                
                this.ownAd = this.isOwnAd(this.ad._id);                
            })
        })
        
    }

    onReport(){
        this.adminService.reportAd(this.ad._id);
    }

    deleteByAdmin(id:String){
        if(this.adDeleted) return;
        this.deleting = true;
        this.adminService.deleteReportedAd(id).subscribe(res=>{
            if(res.success){
                this.deleting = false;
                this.adDeleted = true;
                this.adminService.removeFromReported(res.result);
                alert('Se elimino el anuncio')
            }            
        },err=>{
            this.deleting = false;
            this.errorMessage = err.error.result;            
        });
    }

    ngOnDestroy(){
        this.adSub.unsubscribe();
    }

    isLoggedIn(){
        // Because an User object only exists if login is valid
        return this.userService.copyUserInfo()._id;
    }

    isOwnAd(id:String){
        let ads = this.userService.copyUserInfo().ads;
        let result = ads.find(ad=>ad._id === id);                
        return !!result
    }

    formatDOB(){
        return moment(this.ad.pet.dob).format('MM-DD-YYYY');
    }
}