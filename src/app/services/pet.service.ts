import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Common } from '../services/common';
import { UserService } from './user.service';
import { Pet } from '../models/pet';
import { Ad } from '../models/ad';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  
  constructor(private http:HttpClient,
              private userService:UserService,
              private common:Common,
              public _router:Router) { 

  }

   /**
    Makes a HTTP POST request to create a new pet in DB, captures the incoming data
    (an array of Pets) and sets pets property of the User object to this new value.
    *@method createPet
    * @param {*} form => User-submitted form containing the info to create a new pet.
    */

  createPet(form:FormData){    

    let baseURL = this.common.getUrl('/pets/create');    
    return this.http.post<{success:Boolean,result:Pet[]}>(baseURL,form);
    
  }

  updatePet(id:String,form:FormData){
    /* 
    Makes a HTTP PUT request to update an existing pet in DB, captures the incoming data
    and sets pets property of the User object to this new value. 
    */
    let updateURL = this.common.getUrl(`/pets/${id}/update`);
    return this.http.post<{success:Boolean,result:Pet}>(updateURL,form);
    
  }

  /**
   * Makes a HTTP DELETE call to erase a specific pet from DB
   * @method deletePet
   * @param {String} id - ID of the pet to be deleted in DB
   */

  deletePet(id:String){
    let deleteURL = this.common.getUrl(`/pets/${id}/delete`);
    return this.http.delete<{success:Boolean,result:String}>(deleteURL);    
  }

  /**
   * Used after a successful http delete call. loops the userInfo's pets property and returns an array with the deleted id filtered out
   * @method updateAfterDelete
   * @param {String} id - Id of the pet that was deleted from the DB
   */

  updateAfterDelete(id:String){ 
    
    let pets = this.userService.copyUserInfo().pets;    

    const result = pets.filter(pet=>pet._id!==id);    

    return result
  }

  /**
   * Used after a successful HTTP PUT call. loops the userInfo's pets array by ID and if there's a match, sets its value to the new updated Pet
   * @method afterUpdate
   * @param {Pet} updatedPet - Pet object after being updated server-side
   */

  afterUpdate(updatedPet:Pet){
    let userPetsArray:Pet[] = this.userService.copyUserInfo().pets;
    userPetsArray.forEach((pet:Pet,index) => {
      if(pet._id===updatedPet._id){
        userPetsArray[index] = updatedPet
      }
    });
    return userPetsArray; 
  } 
  
  getCopyPet(id:String){
    let pets = this.userService.copyUserInfo().pets;
    return {...pets.find(p => p._id === id)};
  }

  updatePetsArray(petsArray:Pet[]){
    this.userService.updatedUserData('pets',petsArray);
  }
  
  getImageUrl(id:string){
    return this.common.getUrl(`/getImage?image=${id}`)
  }

}
