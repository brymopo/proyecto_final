import { Component, Input } from '@angular/core';

@Component({
    selector:'app-loading-modal',
    templateUrl:'./loading-modal.component.html',
    styleUrls:['./loading-modal.component.css']
})

export class LoadingModalComponent{
    @Input() id:string;
    @Input() toDelete:string;
    public isHidden=true;
    
}