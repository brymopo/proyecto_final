import { Component, Input } from '@angular/core'

@Component({
    selector:'app-feedback',
    templateUrl:'./feedback.component.html',
    styleUrls:['./feedback.component.css']
})

export class FeedbackComponent{
    @Input() message:string;
    @Input() injectClass:string;
}