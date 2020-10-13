import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PetRoutingModule } from '../routing/pet-routing.module';

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
        PetRoutingModule
    ],
    exports:[        
        PetPostComponent,
        PetListComponent
    ]
})

export class PetModule{

}