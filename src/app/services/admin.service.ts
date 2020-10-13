import { Injectable } from '@angular/core';
import { Admin } from '../models/admin';
import { Ad } from '../models/ad';
import { URL } from './url';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';


@Injectable({
    providedIn:'root'
})

export class AdminService{
    
    constructor(private http:HttpClient,
                private userService:UserService,
                private url:URL){

    }    

    reportAd(id:String){
        const reportUrl = this.url.base + `/admin/report_ad`;
        const body = {id:id}
        this.http.post<{success:Boolean}>(reportUrl,body)
        .subscribe(res=>{
            if(res.success){
                alert('Gracias, se reporto este anuncio')
            }
        })
    }

    isAdmin(){
        //Because the User model does not have an admin property
        return this.userService.copyUserInfo().hasOwnProperty('admin');
    }

    deleteReportedAd(id:String){
        const deleteUrl = this.url.base + `/admin/reported_ads/${id}/delete`;
        this.http.delete<{success:Boolean,result:Ad[]}>(deleteUrl)
        .subscribe(res=>{
            if(res.success){
                this.userService.updatedUserData('reportedAds',res.result);
                alert('Se elimino el anuncio')
            }
        })
    }
    
}