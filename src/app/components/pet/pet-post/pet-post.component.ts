import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PetService } from '../../../services/pet.service';
import { Pet } from '../../../models/pet';
import * as moment from 'moment';

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

  public image:File;

  public previewURL:string|ArrayBuffer;

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
        this.pet.dob = moment(this.pet.dob).format('YYYY-MM-DD');
        this.previewURL = this.pet.pictures[0];
        
      }
      console.log(this.mode);
    })
    
    this.cancelLink = this.getCancelLink();
    
  }  

  onSubmit(form){
    if(form.invalid){
      alert('Uno o mas campos estan vacios. Por favor rectifica e intenta de nuevo')
      return ;
    };

    let formData = this.createFormData(form.value);    

    if(this.mode==='create'){
      this.petService.createPet(formData);
    };

    if(this.mode==='edit'){
      this.petService.updatePet(this.petId,formData);
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

  prepareImage(event:any){
    this.image = <File>event.target.files[0];
    this.previewImage(this.image);    
  }

  previewImage(target){
    let reader = new FileReader();
    reader.readAsDataURL(target);
    reader.onload = ()=>{
      this.previewURL = reader.result;      
    }
  }
  
  createFormData(form){
    const formData = new FormData();
    for (const key in form){      
      formData.append(key,form[key]);
    }
    if(this.image){
      formData.append('image',this.image);
    }
    return formData;
  }

  changeDOB(event){
    console.log(event.target.value);
    console.log(typeof event.target.value);
  }

}
