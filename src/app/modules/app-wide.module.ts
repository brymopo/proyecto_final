import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LoadingComponent } from '../components/loading/loading.component';
import { LoadingButtonComponent } from '../components/loading/loading-button/loading-button.component';
import { MessagePostComponent } from '../components/message/message-post/message-post.component';
import { LoadingModalComponent } from '../components/loading/loading-modal/loading-modal.component';
import { FeedbackComponent } from '../components/loading/feedback/feedback.component';
import { ImageComponent } from '../components/loading/image/image.component'

@NgModule({
    declarations:[
        LoadingComponent,
        LoadingButtonComponent,
        MessagePostComponent,
        LoadingModalComponent,
        FeedbackComponent,
        ImageComponent
    ],
    imports:[
        FormsModule,
        CommonModule
    ],
    exports:[
        LoadingComponent,
        LoadingButtonComponent,
        MessagePostComponent,
        LoadingModalComponent,
        FeedbackComponent,
        ImageComponent
    ]
})

export class AppWideModule{

}