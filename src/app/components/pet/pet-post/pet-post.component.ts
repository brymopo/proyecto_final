import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
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

  public petPostForm:FormGroup;

  public image:File;

  public previewURL:string|ArrayBuffer;

  public loading = false;

  public errorMessage = "";

  constructor(private petService:PetService,
              private route:ActivatedRoute,
              private formBuilder:FormBuilder){
                console.log('constructor triggered.......')    
                      
  }

  validator(pet){
    
    this.petPostForm = this.formBuilder.group({
      species:[pet.species||'',Validators.required],
      breed:[pet.breed||'',Validators.required],
      name:[pet.name||'',Validators.required],
      gender:[pet.gender||'',Validators.required],
      dob:[pet.dob||'',Validators.required],  
      neutered:[pet.neutered||false,Validators.required],
      vaccinated:[pet.vaccinated||false,Validators.required],
      bio:[pet.bio||'',Validators.required],
      city:[pet.city||'',Validators.required],
      province:[pet.province||'',Validators.required],
      country:[pet.country||'',Validators.required],
      image:[''],    
    })
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
      this.validator(this.pet);
      
    })
    
    this.cancelLink = this.getCancelLink();
    
  }  

  onSubmit(){
    
    if(!this.petPostForm.valid){
      alert('Uno o mas campos estan vacios. Por favor rectifica e intenta de nuevo')
      return ;
    };
    this.loading = true;
    let formData = this.configFormData(this.petPostForm.value);    
    
    if(this.mode==='create'){
      this.handlePetCreate(formData);      
    };

    if(this.mode==='edit'){
      this.handlePetUpdate(formData);      
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
  
  configFormData(form){
    let formData;
    if(this.image){
      formData = new FormData();
      formData.append('image',this.image);
      for (const key in form){      
        formData.append(key,form[key]);
      }
    }else{
      delete this.petPostForm.value['image'];
      formData = this.petPostForm.value;
    }

    return formData;
    
  }
  
  handlePetCreate(form){
    this.petService.createPet(form).subscribe(res=>{
      if(res.success){
        this.petService.updatePetsArray(res.result);
        this.petService._router.navigateByUrl('/mi_perfil/mascotas/mis_mascotas');
      }
    },err=>{
      this.loading = false;
      this.errorMessage = err.error.result;      
    });
  }

  handlePetUpdate(form){
    this.petService.updatePet(this.petId,form).subscribe(res=>{
      if(res.success){
        let updatedPetsArray = this.petService.afterUpdate(res.result);
        this.petService.updatePetsArray(updatedPetsArray);
        alert('Se actualizo la informacion');
        this.petService._router.navigateByUrl('/mi_perfil/mascotas/mis_mascotas');
      }
    },err=>{
      this.loading = false;
      this.errorMessage = err.error.result;  
    });
  }

}


/* .subscribe(res=>{
  if(res.success){
    this.userService.updatedUserData('pets',res.result);
    alert('Mascota creada exitosamente');
    this._router.navigateByUrl('/mi_perfil/mascotas/mis_mascotas');
  }
}) */