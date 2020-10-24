import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from '../components/profile/profile.component';
import { UserComponent } from '../components/user/user.component';
import { UserPostComponent } from '../components/user/user-post/user-post.component';
import { ResetPasswordComponent } from '../components/email/reset-password/reset-password.component';


const profileRoutes:Routes = [
    {
        path:"",
        component:ProfileComponent,
        children:[
            {
                path:'usuario',
                component:UserComponent
            },
            {
                path:'editar',
                component:UserPostComponent
            },
            {
                path:'cambiar_clave',
                component:ResetPasswordComponent
            },
            {
                path:'encuesta',
                loadChildren:() => import('../modules/survey.module').then(m=>m.SurveyModule)
            },
            {
                path:'mascotas',
                loadChildren:() => import('../modules/pet.module').then(m=>m.PetModule)
            },
            {
                path:'anuncios',
                loadChildren: ()=> import('../modules/ad.module').then(m=>m.AdModule)
            },
            {
                path:'admin',
                loadChildren: ()=> import ('../modules/admin.module').then(m=>m.AdminModule)
            },
            {
                path:'mensajes',
                loadChildren: ()=> import('../modules/conversation.module').then(m=>m.ConversationModule)
            }
            
        ]
    }
]

@NgModule({
    declarations:[],
    imports:[RouterModule.forChild(profileRoutes)],
    exports:[RouterModule]
})

export class ProfileRoutingModule{

}