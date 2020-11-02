import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { fade } from '../../../animation';

@Component({
  selector: 'app-email-reset',
  templateUrl: './email-reset.component.html',
  styleUrls: ['./email-reset.component.css'],
  animations:[fade]
})

export class EmailResetComponent implements OnInit {
  public isLoading = false;
  public errorMessage="";

  constructor(private authService:AuthService,
              private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(form){
    this.isLoading = true;
    this.authService.requestNewToken(form.value).subscribe(res=>{
      if(res.success){
          this.router.navigateByUrl('validar_email');
      }
    },err=>{
      this.isLoading = false;
      this.errorMessage = err.message;
    });
  }

}
