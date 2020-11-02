import { Injectable } from '@angular/core';
import { Admin } from '../models/admin';
import { Ad } from '../models/ad';
import { Common } from './common';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';


@Injectable({
    providedIn:'root'
})

export class AdminService{
    
    constructor(private http:HttpClient,
                private userService:UserService,
                private common:Common){

    }    

    reportAd(id:String){
        const reportUrl = this.common.getUrl(`/admin/report_ad`);
        const body = {id:id}
        this.http.post<{success:Boolean}>(reportUrl,body)
        .subscribe(res=>{
            if(res.success){
                alert('Gracias, se reporto este anuncio')
            }
        })
    }

    isAdmin(){
        //Because the User model can not have an admin property
        return this.userService.copyUserInfo().hasOwnProperty('admin');
    }

    deleteReportedAd(id:String){
        const deleteUrl = this.common.getUrl(`/admin/reported_ads/${id}/delete`);
        return this.http.delete<{success:Boolean,result:Ad[]}>(deleteUrl);        
    }

    removeFromReported(reportedAds:Ad[]){
        this.userService.updatedUserData('reportedAds',reportedAds);
    }
    
}