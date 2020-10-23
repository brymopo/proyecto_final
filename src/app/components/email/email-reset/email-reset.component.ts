import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';



@Component({
  selector: 'app-email-reset',
  templateUrl: './email-reset.component.html',
  styleUrls: ['./email-reset.component.css']
})
export class EmailResetComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(form){
    this.authService.requestNewToken(form.value);
  }

}
