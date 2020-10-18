import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn:'root'
})

export class Common{    
    private baseURL: string = environment.BASE_URL; 
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