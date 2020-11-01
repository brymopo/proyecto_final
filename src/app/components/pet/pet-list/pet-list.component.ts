import { Component, OnDestroy, OnInit } from '@angular/core'
import { PetService } from '../../../services/pet.service';
import { UserService } from '../../../services/user.service';
import { Pet } from '../../../models/pet';
import { User } from '../../../models/user';
import { Subscription } from 'rxjs';
import { fade } from '../../../animation';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css'],
  animations:[fade]
})
export class PetListComponent implements OnInit, OnDestroy {
  
  public pets:Pet[];

  public deleting = "";

  public errorMessage = "";

  /**
  * Copy of the userInfo object of User Service; contains all user's data.
  * @property userInfo
  */  
  private userSub= new Subscription();

  constructor(public petService:PetService,private userService:UserService) { }

  ngOnInit(): void {    
    
    this.pets = this.userService.copyUserInfo().pets;
    this.userSub = this.userService.getUserDataObservable()
    .subscribe((user:User)=>{      
      this.pets = user.pets;
    })
  }

  onDeletePet(id:string){
    this.deleting = id;
    this.petService.deletePet(id).subscribe(res=>{
      if(res.success){
        this.deleting = "";
        let updatedPetsArray = this.petService.updateAfterDelete(res.result);
        this.petService.updatePetsArray(updatedPetsArray);
        this.petService._router.navigateByUrl('/mi_perfil/mascotas/mis_mascotas');
      }
    },err=>{
      this.deleting = "";
      this.errorMessage = err.error.result;
      
    });
  }
  
  getImageUrl(id:string){
    return this.petService.getImageUrl(id);
  }

  ngOnDestroy(){    
    this.userSub.unsubscribe();
  }
  
}

