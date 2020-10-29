import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AdService } from '../../../services/ad.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Ad } from '../../../models/ad';
import { Pet } from '../../../models/pet';
import { User } from '../../../models/user';
import { Subscription } from 'rxjs';


@Component({
    selector:'app-ad-post',
    templateUrl:'./ad-post.component.html',
    styleUrls:['./ad-post.component.css']
})

export class AdPostComponent implements OnInit, OnDestroy{    
    public ad:Ad;
    public loading=false;
    public errorMessage="";
    public mode:String;
    public pets:Pet[];
    private userSub = new Subscription();
    
    constructor(
                private userService:UserService,
                private route:ActivatedRoute,
                private adService:AdService
                ){

    }

    ngOnInit(){
        this.route.paramMap
        .subscribe((paramMap:ParamMap)=>{
            const adId = paramMap.get('adId');
            this.pets = this.userService.copyUserInfo().pets;            
            if(adId==='nuevo'){
                this.mode = 'create';
                this.ad = new Ad()
                console.log(this.mode,' mode');
            }else{
                this.mode = 'edit';
                console.log(this.mode,' mode');
            }
        })
        
        this.userSub = this.userService.getUserDataObservable()
        .subscribe((user:User)=>{
            this.pets = user.pets;
        })
    }

    ngOnDestroy(){
        this.userSub.unsubscribe()
    }

    onSubmit(form){
        const body = this.pets.find(p=>p._id===form.value.petId);
        this.loading = true;
        this.adService.createAd(body).subscribe(res=>{
            if(res.success){
                this.loading = false;
                this.adService.updateAds(res.result);
                this.adService.router.navigateByUrl('/mi_perfil/anuncios/mis_anuncios');                
            }
        },err=>{
            this.loading = false;
            this.errorMessage = err.error.result;            
        });
    }
}