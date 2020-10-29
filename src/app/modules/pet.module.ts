import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PetRoutingModule } from '../routing/pet-routing.module';
import { AppWideModule } from './app-wide.module';

import { PetPostComponent } from '../components/pet/pet-post/pet-post.component';
import { PetListComponent } from '../components/pet/pet-list/pet-list.component';

@NgModule({
    declarations:[        
        PetPostComponent,
        PetListComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
        PetRoutingModule,
        AppWideModule,        
        ReactiveFormsModule
    ],
    exports:[        
        PetPostComponent,
        PetListComponent
    ]
})

export class PetModule{

}