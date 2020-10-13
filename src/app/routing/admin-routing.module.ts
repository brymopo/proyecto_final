import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PannelComponent } from '../components/admin/pannel/pannel.component';

const adminRoutes:Routes = [
    {
        path:"",
        children:[
            {
                path:"pannel",
                component: PannelComponent
            }
        ]
    }
]

@NgModule({
    imports:[RouterModule.forChild(adminRoutes)],
    exports:[RouterModule]
})

export class AdminRoutingModule{

}
