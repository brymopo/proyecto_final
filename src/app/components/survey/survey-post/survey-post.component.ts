import { Component, OnDestroy, OnInit } from '@angular/core';
import { SurveyService } from '../../../services/survey.service';
import { UserService } from '../../../services/user.service';
import { Common } from '../../../services/common';
import { User } from '../../../models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-survey-post',
  templateUrl: './survey-post.component.html',
  styleUrls: ['./survey-post.component.css']
})
export class SurveyPostComponent implements OnInit, OnDestroy {
  /**
   * Copy of the userInfo object of User Service; contains all user's data.
   * @property userInfo
   */
  private userInfo:User;
  public hasSurvey:Boolean;
  public isLoading:Boolean;
  public questions:String[];
  private subQuestions = new Subscription();
  


  constructor(public surveyService: SurveyService,
              private userService:UserService,
              public common:Common){

  }

  /**
   * handles the submit event to either creating a new survey or updating an existing one, if it exists already
   * @method onSubmit
   * @param form - form containing the info of the survey to create or update
   */
  onSubmit(form){
    this.common.buttonLoading = true;

    if(!this.hasSurvey){
      this.surveyService.createSurvey(form.value);
    }else{      
      this.handleUpdate(this.userInfo.survey[0]._id,form);
    }    
  };

  ngOnInit(){
    this.configBasicProperties();   

    if(!this.hasSurvey){
      this.isLoading = true;
      this.surveyService.getSurveyQuestions();
      this.subQuestions = this.surveyService.getSurveyQuestionsObservable()
      .subscribe((questions:String[])=>{      
        this.questions = questions;
        this.isLoading = false;
      })
    }    
      
  }  

  ngOnDestroy(){
    if(this.subQuestions){
      this.subQuestions.unsubscribe();
    };
     
  } 
  
  /**
   * formats the submitted form and uses the updateSurvey method of the survey service
   * @method handleUpdate
   * @param url - the URL endpoint to update a specific survey
   * @param form - form containing the info of the survey to update
   */

  handleUpdate(id:String, form){
    const body = [];    
    
    for (const key in form.value) {      
      body.push({
          question:key,
          answer:form.value[key]
      });
    }
    
    this.surveyService.updateSurvey(id,body);
  }

  configBasicProperties(){
    this.userInfo = this.userService.copyUserInfo();     
    this.hasSurvey = Boolean(this.userInfo.survey.length);
    this.isLoading = false;
    this.common.buttonLoading = false;
    this.isLoading = false;
  }

}
