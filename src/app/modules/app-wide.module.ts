import { NgModule } from '@angular/core';

import { LoadingComponent } from '../components/loading/loading.component';
import { LoadingButtonComponent } from '../components/loading/loading-button/loading-button.component';

@NgModule({
    declarations:[
        LoadingComponent,
        LoadingButtonComponent
    ],
    imports:[],
    exports:[
        LoadingComponent,
        LoadingButtonComponent
    ]
})

export class AppWideModule{

}