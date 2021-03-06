import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../Guards/auth.guard'; 

import { HeroComponent } from '../components/hero/hero.component';
import { LoginComponent } from '../components/login/login.component';
import { SignupComponent } from '../components/signup/signup.component';
import { Page404Component } from '../components/page404/page404.component';
import { TwoFAComponentComponent } from '../components/two-facomponent/two-facomponent.component';
import { EmailValidateComponent } from '../components/email/email-validate/email-validate.component';
import { EmailVerifiedComponent } from '../components/email/email-verified/email-verified.component';
import { EmailResetComponent } from '../components/email/email-reset/email-reset.component';
import { ResetPasswordComponent } from '../components/email/reset-password/reset-password.component';



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
        path:'iniciarsesion/2fa',
        component: TwoFAComponentComponent
    },
    {
        path:'iniciarsesion/resetPassword',
        component: EmailResetComponent
    },
    {
        path:'crearcuenta',
        component:SignupComponent
    },
    {
        path:'validar_email',
        component:EmailValidateComponent
    },
    {
        path:'confirmation/:token',
        component:EmailVerifiedComponent
    },
    {
        path:'nueva_clave/:token',
        component:ResetPasswordComponent
    },
    {
        path:'mi_perfil',
        canActivate:[AuthGuard],
        loadChildren: () => import('../modules/profile.module').then(m=>m.ProfileModule)
    },
    {
        path:'anuncios',
        loadChildren: ()=> import ('../modules/ad.module').then(m=>m.AdModule)
    },
    {
        path:'**',
        component: Page404Component
    } 
]

@NgModule({
    imports:[RouterModule.forRoot(routes,{useHash:true})],
    exports:[RouterModule]
})

export class AppRoutingModule{

}