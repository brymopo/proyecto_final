import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppWideModule } from './app-wide.module';
import { ProfileRoutingModule } from '../routing/profile-routing.module';
import { FormsModule } from '@angular/forms';

import { ProfileComponent } from '../components/profile/profile.component';
import { UserComponent } from '../components/user/user.component';
import { UserPostComponent } from '../components/user/user-post/user-post.component';


@NgModule({
    declarations:[
        ProfileComponent,
        UserComponent,
        UserPostComponent
    ],
    imports:[
        CommonModule,        
        FormsModule,
        ProfileRoutingModule,
        AppWideModule
    ],
    exports:[
        ProfileComponent,
        UserComponent,
        UserPostComponent        
    ],

})


export class ProfileModule{}