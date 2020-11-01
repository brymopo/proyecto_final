import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



import { AdRoutingModule } from '../routing/ad-routing.module';
import { AppWideModule } from './app-wide.module';

import { AdListComponent } from '../components/ad/ad-list/ad-list.component';
import { AdPostComponent } from '../components/ad/ad-post/ad-post.component';
import { AdShowComponent } from '../components/ad/ad-show/ad-show.component';

@NgModule({
    declarations:[
        AdListComponent,
        AdPostComponent,
        AdShowComponent
    ],
    imports:[
        CommonModule,
        AdRoutingModule,
        FormsModule,
        AppWideModule                    
    ],
    exports:[
        AdListComponent,
        AdPostComponent,
        AdShowComponent
    ]
})

export class AdModule{

}