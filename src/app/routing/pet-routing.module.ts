import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PetPostComponent } from '../components/pet/pet-post/pet-post.component';
import { PetListComponent } from '../components/pet/pet-list/pet-list.component';

const petRoutes:Routes = [
    {
        path:"",        
        children:[
            {
                path:"editar/:petId",
                component:PetPostComponent
            },
            {
                path:"editar",
                component:PetPostComponent
            },
            {
                path:"mis_mascotas",
                component:PetListComponent
            }
        ]
    }    
]

@NgModule({
    imports:[RouterModule.forChild(petRoutes)],
    exports:[RouterModule]
})

export class PetRoutingModule{

}