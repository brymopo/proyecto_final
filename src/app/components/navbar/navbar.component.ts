import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {  

  constructor(private authService:AuthService) { }  

  onLogOut(){
    this.authService.logout();
  }

  getLogin(){
    return this.authService.isLoggedIn()
  }
}
