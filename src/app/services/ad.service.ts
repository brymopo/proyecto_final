import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { Ad } from '../models/ad';
import { Common } from '../services/common';
import { Observable, Subject } from 'rxjs';
import { Pet } from '../models/pet';

@Injectable({
    providedIn:'root'
})

export class AdService{
    private ads:Ad[];
    private allAds:Ad[];    
    private adSub = new Subject();
    private allAdsSub = new Subject(); 
        
    
    constructor(private http:HttpClient,
                private common:Common,
                private userService:UserService,
                public router:Router){

    }

    getOneAdPopulated(id:String){
        let showOneUrl = this.common.getUrl(`/ads/${id}`);
        return this.http.get<{success:Boolean,result:Ad}>(showOneUrl)
        .subscribe(res=>{
            console.log('response: ',res);
            if(res.success){
                this.adSub.next(res.result);
            }
        },err=>{
            if(err){
                this.adSub.next(false);
            }
        })
    }    

    getOneAdAsObservable(){
        return this.adSub.asObservable();
    }

    getAllAds(){
        let adsUrl = this.common.getUrl('/ads/show_all');
        return this.http.get<{success:Boolean,result:Ad[]}>(adsUrl)
        .subscribe(res=>{
            this.allAdsSub.next(res.result);
        },err=>{
            this.allAdsSub.next(err);
        })
    }

    getAllAdsAsObservable(){
        return this.allAdsSub.asObservable()
    }

    createAd(form:Pet){
        let createUrl = this.common.getUrl('/ads/create');
        console.log(createUrl)
        return this.http.post<{success:Boolean,result:Ad}>(createUrl,form);        
    }

    updateAds(newAdd:Ad){
        const adsArray = this.userService.copyUserInfo().ads;
        adsArray.push(newAdd);
        this.userService.updatedUserData('ads',adsArray);
    }

    deleteAds(id:String){
        const deleteUrl = this.common.getUrl(`/ads/${id}/delete`);
        return this.http.delete<{success:Boolean,result:string}>(deleteUrl);        
    }

    updateAfterDelete(id:string){
        let userAds = this.userService.copyUserInfo().ads;
        let result  = userAds.filter(ad=>ad._id !== id);

        this.userService.updatedUserData('ads',result);
        
    }   

}