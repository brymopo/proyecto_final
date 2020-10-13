import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL } from '../services/url';
import { UserService } from './user.service';
import { Pet } from '../models/pet';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  
  constructor(private http:HttpClient,
              private userService:UserService,
              private url:URL,
              private _router:Router) { 

  }

   /**
    Makes a HTTP POST request to create a new pet in DB, captures the incoming data
    (an array of Pets) and sets pets property of the User object to this new value.
    *@method createPet
    * @param {*} form => User-submitted form containing the info to create a new pet.
    */

  createPet(form:Pet){    

    let baseURL = this.url.base + '/pets/create';

    this.http.post<{success:Boolean,result:Pet[]}>(baseURL,form)
    .subscribe(res=>{
      if(res.success){
        this.userService.updatedUserData('pets',res.result);
        alert('Mascota creada exitosamente');
        this._router.navigateByUrl('/mi_perfil/mascotas/mis_mascotas');
      }
    })
  }

  updatePet(id:String,form:Pet){
    /* 
    Makes a HTTP PUT request to update an existing pet in DB, captures the incoming data
    and sets pets property of the User object to this new value. 
    */
    let updateURL = this.url.base+`/pets/${id}/update`;

    this.http.put<{success:Boolean,result:Pet}>(updateURL,form)
    .subscribe(res=>{
      if(res.success){
        let updatedPetsArray = this.afterUpdate(res.result);
        this.userService.updatedUserData('pets',updatedPetsArray);
        alert('Se actualizo la informacion');
        this._router.navigateByUrl('/mi_perfil/mascotas/mis_mascotas');
      }
    })
  }

  /**
   * Makes a HTTP DELETE call to erase a specific pet from DB
   * @method deletePet
   * @param {String} id - ID of the pet to be deleted in DB
   */

  deletePet(id:String){
    let deleteURL = this.url.base + `/pets/${id}/delete`;
    
    this.http.delete<{success:Boolean,result:String}>(deleteURL)
    .subscribe(res=>{
      if(res.success){
        let updatedPetsArray = this.updateAfterDelete(res.result)
        this.userService.updatedUserData('pets',updatedPetsArray);
        alert('Mascota eliminada')
        this._router.navigateByUrl('/mi_perfil/mascotas/mis_mascotas');
      }
    })
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
  
}
