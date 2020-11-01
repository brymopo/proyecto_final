import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Ad } from '../../../models/ad';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { AdService } from '../../../services/ad.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { fade } from '../../../animation';

@Component({
    selector:'app-ad-list',
    templateUrl:'./ad-list.component.html',
    styleUrls:['./ad-list.component.css'],
    animations:[ fade ]
})

export class AdListComponent implements OnInit, OnDestroy{
    public ads:Ad[];
    public loading:boolean;
    public deleting:string;
    public mode:String;
    private userSub = new Subscription();
    private adSub = new Subscription();
    public errorMessage = ""; 
    

    constructor(private userService:UserService,
                private adService:AdService,
                private route:ActivatedRoute,
                private _router:Router){

    }
    
    ngOnInit(){
        this.loading = true;
        this.route.paramMap.subscribe((paramMap:ParamMap)=>{
            this.mode = paramMap.get('mode');
            if(this.mode==='mis_anuncios'){
                this.ads = this.userService.copyUserInfo().ads;
                this.loading=false;
                this.userSub = this.userService.getUserDataObservable()
                .subscribe((user:User)=>{
                    this.ads = user.ads;                    
                })
            } else if(this.mode==='todos'){
                this.adService.getAllAds();
                this.adSub = this.adService.getAllAdsAsObservable()
                .subscribe((ads:Ad[])=>{
                    this.ads = ads;
                    this.loading=false;
                    console.log(ads)
                },err=>{
                    this.loading=false;
                    this.errorMessage = err.error.result;
                })
            } else {
                this._router.navigateByUrl('**');
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

    onDelete(id:string){
        this.deleting = id;
        this.adService.deleteAds(id).subscribe(res=>{
            this.adService.updateAfterDelete(res.result);            
        },err=>{
            this.deleting = "";
            this.userService.getUserData();
            alert('Ocurrio un error al eliminar');            
        });
    }     
    
    ownAds(){
        return this.mode==='mis_anuncios'
    }

}