import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { fade } from '../../../animation';

@Component({
  selector: 'app-email-verified',
  templateUrl: './email-verified.component.html',
  styleUrls: ['./email-verified.component.css'],
  animations:[fade]
})
export class EmailVerifiedComponent implements OnInit {
  public loading=true;
  public success:string;
  public errorMessage:string;

  constructor(private route:ActivatedRoute,
              private AuthService:AuthService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      let token = paramMap.get('token');
      if(token.length){
        this.AuthService.validateEmail(token).subscribe(res=>{
            if(res.result){
              this.success = "Gracias, tu correo ha sido confirmado!"
              this.loading = false;
            }            
        },err=>{
          this.loading = false;
          this.errorMessage = err.error.result;
        });
      }else{
        this.loading = false;
        this.errorMessage = 'Algo salio mal. Por favor intenta de nuevo'
      }
    })
  }

  nextStep(){
    this.AuthService.router.navigateByUrl('iniciarsesion')
  }

}
