import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL } from '../services/url';
import { Subject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
    providedIn:'root'
})

export class UserService implements OnInit{
    /**
     * Object that stores the user's info retrieved from the DB.
     * @property userInfo
     */

    private userInfo:User;

    /**
     * Observable to push the userInfo object (or a copy) to all subscribed observers
     * @property UserDataEvent
     */

    private userDataEvent = new Subject();

    private base:String;

    constructor(private http:HttpClient,
                private url:URL){

    }

    /** 
        * Sends a HTTP GET request to pull the user's data; saves the incoming user in the userInfo object and pushes the new data to all observers
        * @method getUserData        
    */

    getUserData(){
        
        const showURL = this.url.base + '/users/show';

        this.http.get<{success:Boolean,result:User}>(showURL)
        .subscribe(res=>{
            if(res.success){
                this.userInfo = res.result;
                this.userDataEvent.next({...this.userInfo});
                return res.result;
            }
        })
    }

    /** 
        *Updates a specific key/value pair of the userInfo object belonging to the User Service and pushes the new data to all subscribed observers
        * @method updateUserData
        * @param {String} key the User property key to be updated
        * @param {*} value the new value to update
    */

    updatedUserData(key, value){       

        this.userInfo[key] = value;      

        this.userDataEvent.next({...this.userInfo});        
    }

    /**
    * No parameters, returns a copy of the userInfo object
    * @method copyUserInfo
    */

    copyUserInfo(){        
        return {...this.userInfo};
    }

    /**
    * No parameters, returns an observable (UserDataEvent)
    * @method getUserDataObservable
    */

    getUserDataObservable(){
        return this.userDataEvent;
    }

    ngOnInit(){
        this.getUserData();        
    }

    /**
     * Sends a HTTP PUT request to update the user; saves the incoming, updated user in the userInfo object and pushes the new data to all observers.
     * @method updateUser
     * @param form - The user-submitted form with the user info to update
     */

    updateUser(form){
        
        const updateURL = this.url.base + '/users/update';
        
        this.http.put<{success:Boolean,result:User}>(updateURL,form)
        .subscribe(res=>{
            if(res.success){
                this.userInfo = res.result;                
                this.userDataEvent.next({...this.userInfo});
                alert('La operacion se completo exitosamente!')
            }

        })
    }
}