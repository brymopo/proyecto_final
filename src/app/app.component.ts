import { Component, HostListener } from '@angular/core';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Atpoda - Adopta, no compres';
  offline=false;
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

  constructor(private authService:AuthService){
    
  }
  
}
