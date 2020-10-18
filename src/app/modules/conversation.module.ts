import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConversationRoutingModule } from '../routing/conversation-routing.module';
import { AppWideModule } from "./app-wide.module";

import { ConversationListComponent } from '../components/conversation/conversation-list/conversation-list.component';
import { ConversationShowComponent } from '../components/conversation/conversation-show/conversation-show.component';

@NgModule({
    declarations:[
        ConversationListComponent,
        ConversationShowComponent
    ],
    imports:[
        CommonModule,
        ConversationRoutingModule,
        FormsModule,
        AppWideModule
    ],
    exports:[
        ConversationListComponent,
        ConversationShowComponent
    ]
})

export class ConversationModule{

}