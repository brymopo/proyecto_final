import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConversationListComponent } from '../components/conversation/conversation-list/conversation-list.component';
import { ConversationShowComponent } from '../components/conversation/conversation-show/conversation-show.component';

const conversationRoutes:Routes = [
    {
        path:"",
        children:[
            {
                path:'mis_mensajes',
                component:ConversationListComponent
            },
            {
                path:'mis_mensajes/:msg_id',
                component:ConversationShowComponent
            }
        ]
    }
]

@NgModule({
    imports:[RouterModule.forChild(conversationRoutes)],
    exports:[RouterModule]
})

export class ConversationRoutingModule{

}