import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector:'app-loading-button',
    templateUrl:'./loading-button.component.html'
})

export class LoadingButtonComponent implements OnInit{
    @Input() message:string;

    ngOnInit(){

    }

}