import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL } from '../services/url';
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
    

    constructor(private http:HttpClient,
                private router:Router,
                private url:URL){

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
        const loginData={
            username:form.username,
            password:form.password
        }

        const loginURL = this.url.base + '/users/login';
        
        this.http.post<{success:boolean,result:any}>(loginURL,loginData).subscribe(res=>{
            if(res.success){
                this.loginFailed = "";
                this.setLocalStorage(res.result);
                this.isLoggedIn();
                this.router.navigateByUrl('mi_perfil');
            }
        },(err)=>{
            this.loginFailed = err.error.result;
            this.router.navigateByUrl('iniciarsesion')            
        })
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

        const signUpURL = this.url.base + '/users/new';

        this.http.post<{success:Boolean,result:any}>(signUpURL,newUser).subscribe(res=>{
            if(res.success){                
                this.setLocalStorage(res.result);
                this.router.navigateByUrl('');                
            };
        })
    }    
}