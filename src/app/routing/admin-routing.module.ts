import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../Guards/auth.guard'

import { PannelComponent } from '../components/admin/pannel/pannel.component';

const adminRoutes:Routes = [
    {
        path:"",
        children:[
            {
                path:"pannel",
                canActivate:[AuthGuard],
                data:{only:'Admin'},
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
