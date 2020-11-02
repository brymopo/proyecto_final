import { Component, HostListener } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Atpoda - Adopta, no compres';
  offline=false;
  private lastPosition = 0;
  public hideNavBar = false;
  @HostListener('window:unload',['$event'])
  unloadHandler(event){
    let rememberMe = this.authService.rememberMe;
    if(!rememberMe){
      localStorage.clear();
    }
    if(localStorage.getItem('dismissed')){
      localStorage.setItem('dismissed','');
    }
  }

   @HostListener('window:offline',['$event'])
  offlineHandler(event){
    this.offline = true;
  }

  @HostListener('window:online',['$event'])
  onlineHandler(event){
    this.offline = false;    
  }
  
  @HostListener('window:scroll',['$event'])
  scrollHandler(event){
    let currentPosition = window.pageYOffset;
    if(this.lastPosition > currentPosition){
      this.hideNavBar = false;
    }else{
      this.hideNavBar = true;
    }

    this.lastPosition = currentPosition;
  }

  @HostListener('window:load',['$event'])
  onLoadHandler(event){
    if(this.authService.isLoggedIn()){
        this.userService.getUserData();
    }
  }

  constructor(private authService:AuthService,
              private userService:UserService){
    
  }
  
}
