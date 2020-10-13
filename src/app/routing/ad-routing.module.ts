import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdListComponent } from '../components/ad/ad-list/ad-list.component';
import { AdPostComponent } from '../components/ad/ad-post/ad-post.component';
import { AdShowComponent } from '../components/ad/ad-show/ad-show.component';

const adRoutes:Routes = [
    {
        path:"",
        children:[
            {
                path:'mis_anuncios',
                component:AdListComponent                
            },
            {
                path:'anuncios_form/:adId',
                component:AdPostComponent
            },
            {
                path:':adId',
                component: AdShowComponent
            }
        ]
    }
];

@NgModule({
    imports:[RouterModule.forChild(adRoutes)],
    exports:[RouterModule]
})

export class AdRoutingModule{

}