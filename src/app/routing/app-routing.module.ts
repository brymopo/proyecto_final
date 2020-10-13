import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroComponent } from '../components/hero/hero.component';
import { LoginComponent } from '../components/login/login.component';
import { SignupComponent } from '../components/signup/signup.component';



const routes:Routes=[
    {
        path:'',
        component: HeroComponent
    },
    {
        path:'iniciarsesion',
        component:LoginComponent
    },
    {
        path:'crearcuenta',
        component:SignupComponent
    },
    {
        path:'mi_perfil',
        loadChildren: () => import('../modules/profile.module').then(m=>m.ProfileModule)
    },
    {
        path:'acerca',
        loadChildren:()=> import ('../modules/survey.module').then(m=>m.SurveyModule)
    },
    {
        path:'anuncios_adopcion',
        loadChildren: ()=> import ('../modules/ad.module').then(m=>m.AdModule)
    } 
]

@NgModule({
    imports:[RouterModule.forRoot(routes,{useHash:true})],
    exports:[RouterModule]
})

export class AppRoutingModule{

}