import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn:'root'
})

export class Common{
    /* private baseURL: string = "https://atpoda.herokuapp.com"; */
    private baseURL: string = "http://localhost:3000"; 
    public isLoading:Boolean;
    public buttonLoading:Boolean;
    private loadingEvent = new Subject();     

    getUrl(ext:string){
        return this.baseURL + ext;
    }

    changeIsLoading(status:Boolean){
        this.isLoading = status;
        this.loadingEvent.next(status)
    }

    isLoadingAsObservable(){
        return this.loadingEvent.asObservable();
    }

}