import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PetService } from '../../../services/pet.service';
import { Pet } from '../../../models/pet';

@Component({
  selector: 'app-pet-post',
  templateUrl: './pet-post.component.html',
  styleUrls: ['./pet-post.component.css']
})
export class PetPostComponent implements OnInit {
  
  private petId:String;

  /**
   * Indicates if the post component will create a new pet or edit an existing one
   * @property {String } mode
   */

  public mode:String;

  /**
   * Binds to the routerLink property to dynamically set the URL to return to the sibling 
   * component.
   * @property {String } cancelLink
   */

  public cancelLink:String;

  public pet:Pet;

  constructor(private petService:PetService,
              private route:ActivatedRoute){

  }

  ngOnInit(){
    this.route.paramMap
    .subscribe((paramMap:ParamMap)=>{

      if(!paramMap.has('petId')){
        this.mode = 'create';
        this.pet = new Pet();
        
      }else{
        this.mode = 'edit';
        this.petId = paramMap.get('petId');
        this.pet = this.petService.getCopyPet(this.petId);
        
      }
    })
    
    this.cancelLink = this.getCancelLink();
    
  }  

  onSubmit(form){
    if(form.invalid){
      alert('Uno o mas campos estan vacios. Por favor rectifica e intenta de nuevo')
      return ;
    };

    if(this.mode==='create'){
      this.petService.createPet(form.value);
    };

    if(this.mode==='edit'){
      this.petService.updatePet(this.petId,form.value);
    };
    
  }
  
  /**
   * No arguments, returns a string with the cancel link based off of the current mode of the
   * post component (either create)
   * @method getCancelLink
   */

  getCancelLink(){
    // this.mode should only take two modes: create or edit.

    return this.mode==='create'?'../mis_mascotas':'../../mis_mascotas';
  }
  
}
