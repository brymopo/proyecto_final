import { Component, Input, OnInit } from '@angular/core'
import { Common } from '../../../services/common';

@Component({
    selector:'app-image',
    templateUrl:'./image.component.html',
    styleUrls:['./image.component.css']
})

export class ImageComponent implements OnInit{
    @Input() injectAlt:string;
    @Input() pictureId:string;
    @Input() fullsize:boolean;   

    public srcLink:string;    
    public showBlank=false;
    public loadingDone = false;
    public imageUrl:string = "url('http://localhost:3000/assets/images/b92dRvzOlrE60fr9TsWN0IEx.jpg')";

    constructor(private common:Common){

    }

    ngOnInit(){
        
        if(!this.pictureId){
            this.showBlank = true;
        }else{
            this.srcLink = this.common.getUrl(`/getImage?image=${this.pictureId}`);                     
        }
        
    }

    onLoad(event){

        if(!this.fullsize) {

            this.imageUrl = `url(${this.srcLink})`;            
            this.loadingDone = true;

        }else{
            
            this.loadingDone = true;
            
        }       
    }

    onError(event){
        
        this.showBlank = true;
        this.loadingDone = false;       
        
    }
}