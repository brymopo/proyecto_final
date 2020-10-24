import { Component, HostListener } from '@angular/core';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Atpoda - Adopta, no compres';
  @HostListener('window:unload',['$event'])
  unloadHandler(event){
    let rememberMe = this.authService.rememberMe;
    if(!rememberMe){
      localStorage.clear();
    }
  }

  constructor(private authService:AuthService){
    
  }
  
}
