import { Component, Input, OnInit } from '@angular/core'
import { Common } from '../../../services/common';
import { fade } from '../../../animation';

@Component({
    selector:'app-image',
    templateUrl:'./image.component.html',
    styleUrls:['./image.component.css'],
    animations:[fade]
})

export class ImageComponent implements OnInit{
    @Input() injectAlt:string;
    @Input() pictureId:string;
    @Input() fullsize:boolean;
    @Input() smartphone:boolean;
    @Input() offline:boolean;
    @Input() errorIcon:boolean;
    @Input() successIcon:boolean;
    @Input() injectClass:string;

    
    public srcLink:string
    public loadError = false;
    public showSVG:boolean;        
    public showBlank=false;
    public loadingDone = false;
    public imageUrl:string = "url('http://localhost:3000/assets/images/b92dRvzOlrE60fr9TsWN0IEx.jpg')";

    constructor(private common:Common){

    }

    ngOnInit(){
        
        if(this.smartphone || this.offline || this.errorIcon || this.successIcon){

            this.showBlank = false;

        }else if(!this.pictureId){
            this.showBlank = true; 
        }else{
            this.srcLink = this.common.getUrl(`/getImage?image=${this.pictureId}`);                    
        }

        this.showSVG = this.checkForSVG();
    }

    onLoad(event){
        console.log('on load trigerred...')
        if(!this.fullsize) {

            this.imageUrl = `url(${this.srcLink})`;            
            this.loadingDone = true;

        }else{
            
            this.loadingDone = true;
            
        }       
    }

    onError(event){
        console.log('on error triggered...')
        this.showBlank = true;
        this.loadingDone = true; 
        this.loadError = true;      
        
    }

    checkForSVG(){        
        return !!(this.showBlank || this.smartphone || this.offline || this.errorIcon || this.successIcon);
    }
}