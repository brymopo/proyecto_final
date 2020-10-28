import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Common } from '../services/common';
import { UserService } from './user.service';
import { Router } from '@angular/router'
import * as moment from 'moment';


@Injectable({providedIn:'root'})

export class AuthService implements OnInit{
    /**
     * if true, there is a logged in user; else, there isn't
     * @property loggedIn
     */

    private loggedIn:Boolean;

    /**
     * String, saves the error message of a failed login attempt to be displayed for user feedback
     * @method loginFailed
     */

    public loginFailed:String;

    public rememberMe:boolean = true;
    

    constructor(private http:HttpClient,
                private router:Router,
                private common:Common,
                private userService:UserService){

    }

    ngOnInit(){
        this.isLoggedIn();        
    }

    /**
     * Stores a JWT in local storage and formats the expiresIn property of the response.
     * @method setLocalStorage
     * @param response - Object containing the token and its expiration info after a successful login.
     */
    setLocalStorage(response:{token:any,expiresIn:any}){
        let amount = parseInt(response.expiresIn[0]);
        let unit =  response.expiresIn[1]

        const expires = moment().add(amount, unit);
        
        localStorage.setItem('token',response.token);
        localStorage.setItem('expires',JSON.stringify(expires));        
    }

    /**
     * Deletes the token and its expiration from local storage
     * @method logout
     */

    logout(){
        localStorage.removeItem('token');
        localStorage.removeItem('expires');
        this.userService.destroyUser();
        this.isLoggedIn();        
    }

    /**
     * No parameters, gets token's expiration from local storage.
     * @method getExpiration
     */

    getExpiration(){
        let expirationAt = JSON.parse(localStorage.getItem('expires'));        
        return moment(expirationAt);
    }

    /**
     * No parameters, returns true if the token has not expired; else, false.
     * @method isLoggedIn
     */

    isLoggedIn(){        
        this.loggedIn = moment().isBefore(this.getExpiration());        
        return this.loggedIn;
    }    

    /**
     * Makes POST request to server to get a token login for the user
     * @method login
     * @param form - contains user login data (username and password)
     */

    login(form){
        this.rememberMe = form.remember;
        
        const loginData={
            username:form.username,
            password:form.password
        }
        console.log('outgoing form: ',loginData);
        const loginURL = this.common.getUrl('/users/login');
        
        return this.http.post<{success:boolean,result:any}>(loginURL,loginData);
    };

    /**
     * Makes a POST request to create a new user. Receives a new login token as a response.
     * @method signUp
     * @param form - form with the info to create a new user server-side
     */

    signUp(form){
        const newUser = {
            username:form.username,
            firstName:form.firstName,
            lastName:form.lastName,
            email:form.email,
            password:form.password,
            phone:form.phone
        };

        const signUpURL = this.common.getUrl('/users/new');

        this.http.post<{success:Boolean,result:any}>(signUpURL,newUser).subscribe(res=>{
            if(res.success){                
                // this.setLocalStorage(res.result);
                this.common.changeIsLoading(false);
                alert('El usuario se creo correctamente!')
                this.router.navigateByUrl('validar_email');                
            };
        },err=>{
            this.common.changeIsLoading(false);
            alert('Ocurrio un error: ' + err.message)
        })
    }

    validateEmail(token:string){
        let url = this.common.getUrl(`/confirmation/${token}`);
        this.http.get<{success:boolean,result:any}>(url)
        .subscribe(res=>{
            if(res.success){
                this.setLocalStorage(res.result);
                alert('Gracias, tu correo ha sido confirmado!')
                this.router.navigateByUrl('mi_perfil');    
            }
        },err=>{
            alert(`Oops, ocurrio un error: ${err.message}`);
            this.router.navigateByUrl('/');    
        })
    }
    
    validate2FA(form){
        let url = this.common.getUrl('/users/login/2fa');
        this.http.post<{success:boolean,result:any}>(url,form).subscribe(res=>{
                console.log('received',res.result);
                this.loginFailed = "";
                this.setLocalStorage(res.result);                
                this.common.changeIsLoading(false);                
                this.router.navigateByUrl('mi_perfil');
                this.isLoggedIn();
        })
    }

    resend2FACode(form){
        let url = this.common.getUrl('/users/login/resend2fa');
        this.http.post<{success:true,result:string}>(url,form).subscribe(res=>{
            if(res.success){
                alert('El codigo se ha reenviado');
            }
        },err=>{
            alert(`Error: ${err.message}`);
        })
    }

    requestNewToken(form){
        let url = this.common.getUrl('/users/sendResetToken');
        this.http.post<{success:boolean,result:string}>(url,form)
        .subscribe(res=>{
            if(res.success){
                this.router.navigateByUrl('validar_email');
            }
        })
    }

    resetPasswordWithToken(form,token){
        let url = this.common.getUrl(`/users/reset_password/${token}`);
        console.log('Sending to url: ',url);
        this.http.post<{success:boolean,result:string}>(url,form)
        .subscribe(res=>{
            if(res.success){
                alert('Clave reestablecida!');
                this.router.navigateByUrl('iniciarsesion');
            }
        })
    }

    changePasswordBy2fa(form){
        let url = this.common.getUrl('/users/password/change');
        this.http.post<{success:boolean,result:any}>(url,form).subscribe(res=>{
            if(res.success){
                alert('Clave cambiada con exito');
                this.router.navigateByUrl('mi_perfil');
            }
        },
        err=>{
            alert(err.message);
        })
    }
}