/*  Native Angular Modules Imports */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';

/*  Custom Modules imports */

import { ProfileModule } from './modules/profile.module';
import { SurveyModule } from './modules/survey.module';
import { PetModule } from './modules/pet.module';
import { AdModule } from './modules/ad.module';
import { AdminModule } from './modules/admin.module';


/* Routing Module Import */

import { AppRoutingModule } from './routing/app-routing.module';


/* Component imports */

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthInterceptor } from './auth.interceptor';


/* Services */

import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { AdService } from './services/ad.service';
import { URL } from './services/url';
import { AdminService } from './services/admin.service';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeroComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent          
  ],
  imports: [
    BrowserModule,       
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,     
    ProfileModule,    
    SurveyModule,
    PetModule,
    AdModule,
    AdminModule
  ],
  providers: [
    AuthService,
    {
      provide:HTTP_INTERCEPTORS,
      multi:true,
      useClass:AuthInterceptor
    },
    UserService,
    AdService,
    URL,
    AdminService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
