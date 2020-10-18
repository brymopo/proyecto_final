import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LoadingComponent } from '../components/loading/loading.component';
import { LoadingButtonComponent } from '../components/loading/loading-button/loading-button.component';
import { MessagePostComponent } from '../components/message/message-post/message-post.component';

@NgModule({
    declarations:[
        LoadingComponent,
        LoadingButtonComponent,
        MessagePostComponent
    ],
    imports:[
        FormsModule,
        CommonModule
    ],
    exports:[
        LoadingComponent,
        LoadingButtonComponent,
        MessagePostComponent
    ]
})

export class AppWideModule{

}