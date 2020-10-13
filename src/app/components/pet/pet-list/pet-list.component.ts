import { Component, OnInit } from '@angular/core'
import { PetService } from '../../../services/pet.service';
import { UserService } from '../../../services/user.service';
import { Pet } from '../../../models/pet';
import { User } from '../../../models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css']
})
export class PetListComponent implements OnInit {
  
  public pets:Pet[];

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

  onDeletePet(id:String){
    this.petService.deletePet(id);
  } 
  
}

