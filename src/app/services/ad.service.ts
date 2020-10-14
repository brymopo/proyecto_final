import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { Ad } from '../models/ad';
import { URL } from '../services/url';
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
                private url:URL,
                private userService:UserService,
                private router:Router){

    }

    getOneAdPopulated(id:String){
        let showOneUrl = this.url.base + `/ads/${id}`;
        return this.http.get<{success:Boolean,result:Ad}>(showOneUrl)
        .subscribe(res=>{
            if(res.success){
                this.adSub.next(res.result);
            }
        })
    }    

    getOneAdAsObservable(){
        return this.adSub.asObservable();
    }

    getAllAds(){
        let adsUrl = this.url.base + '/ads/show_all';
        return this.http.get<{success:Boolean,result:Ad[]}>(adsUrl)
        .subscribe(res=>{
            this.allAdsSub.next(res.result);
        })
    }

    getAllAdsAsObservable(){
        return this.allAdsSub.asObservable()
    }

    createAd(form:Pet){
        let createUrl = this.url.base + '/ads/create';
        console.log(createUrl)
        this.http.post<{success:Boolean,result:Ad}>(createUrl,form)
        .subscribe(res=>{
            if(res.success){
                this.updateAds(res.result);
                this.router.navigateByUrl('/mi_perfil/anuncios/mis_anuncios');
                alert('Se creo el anuncio!')
            }
        })
    }

    updateAds(newAdd:Ad){
        const adsArray = this.userService.copyUserInfo().ads;
        adsArray.push(newAdd);
        this.userService.updatedUserData('ads',adsArray);
    }

    deleteAds(id:String){
        const deleteUrl = this.url.base + `/ads/${id}/delete`;
        this.http.delete<{success:Boolean,result:String}>(deleteUrl)
        .subscribe(res=>{
            if(res.success){
                this.userService.updatedUserData('ads',this.updateAfterDelete(res.result));
                this.router.navigateByUrl('/mi_perfil/anuncios/mis_anuncios');
                alert('Se elimino el anuncio!')
            }
        })
    }

    updateAfterDelete(id:String){
        let userAds = this.userService.copyUserInfo().ads;
        let result  = userAds.filter(ad=>ad._id !== id);
        return result
    }   
    

}