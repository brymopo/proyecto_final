import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from '../routing/admin-routing.module';

import { PannelComponent } from '../components/admin/pannel/pannel.component';

@NgModule({
    declarations:[
        PannelComponent
    ],
    imports:[
        CommonModule,
        AdminRoutingModule
    ],
    exports:[
        PannelComponent
    ]
})

export class AdminModule{

}