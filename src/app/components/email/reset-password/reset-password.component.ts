import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  private token:string;

  constructor(private route:ActivatedRoute,
              private authService:AuthService) { }

  ngOnInit(): void {
      this.route.paramMap.subscribe((paramMap:ParamMap)=>{
        this.token = paramMap.get('token');
      })
  }

  onSubmit(form){
    this.authService.resetPasswordWithToken(form.value,this.token);
  }

}
