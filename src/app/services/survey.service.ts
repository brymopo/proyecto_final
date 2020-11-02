import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Common } from '../services/common';
import { Subject } from 'rxjs';
import { Survey } from '../models/survey';
import { UserService } from './user.service';



@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  /**
   * Saves the master survey questions retrieved from the API.
   * @property questions
   */

  public questions:String[];

  /**
   * Either a string of an individual survey id not belonging to the logged in user to be displayed OR loggedInUser.
   * @property surveyFeatured
   */

  public surveyFeatured:String;

   /**
   * Stores the info of an individual survey, that may or may not belong to the logged in user
   * @property survey
   */

  private survey:Survey;
  private surveySub= new Subject();  
  private questionSub= new Subject();

  constructor(private http:HttpClient,
              private userService:UserService,
              private common:Common,
              public router:Router
              ){ 

  }

  /**
   * No parameters, makes a HTTP GET call to get the questions to build the survey form.
   * @method getSurveyQuestions
   */

  getSurveyQuestions(){
    
    let getUrl = this.common.getUrl('/survey/questions/show');
    this.http.get<{success:Boolean,result:String[]}>(getUrl)
    .subscribe(res=>{
      if(res.success){        
        this.questions = res.result;        
        this.questionSub.next([...this.questions]);             
      }
    })
  }

  /**
   * No parameters, returns an observable for the survey questions
   * @method getSurveyQuestionsObservable
   */

  getSurveyQuestionsObservable(){
    return this.questionSub.asObservable();
  }

  /**
   * No parameters, returns an observable to push the survey stored in the survey property
   * @method getSurveyAsObservable
   */

  getSurveyAsObservable(){
    return this.surveySub.asObservable();
  }

  /**
   * Makes a HTTP POST call to create a new survey.
   * @method createSurvey
   * @param {*} form - the user-submitted form with the info to build a new survey in DB.
  */

  createSurvey(form){    
    let createUrl = this.common.getUrl('/survey/new');
    return this.http.post<{success:Boolean,result:Survey}>(createUrl, form);    
  }

  /**
   * Makes a HTTP DELETE call to remove a survey from DB
   * @method deleteSurvey
   * @param url - the API endpoint to remove a specific survey from DB;
   * 
   */

  deleteSurvey(id:String){
    const deleteUrl = this.common.getUrl(`/survey/${id}/delete`);
    return this.http.delete<{success:Boolean,result:any}>(deleteUrl);   
  }

  /**
   * Makes a HTTP PUT call to update a survey from DB
   * @method updateSurvey
   * @param url - the API endpoint to update a specific survey in DB;
   * @param survey - form containing the survey info to update
   */
  updateSurvey(id:String, survey){
    const updateUrl = this.common.getUrl(`/survey/${id}/update`);
    return this.http.put<{success:Boolean,result:Survey}>(updateUrl,survey);    
  } 

  /**
   * No parameters, makes a HTTP GET call to retrieve the info of the survey Id stored in the surveyFeatured property. Saves the incoming value to the survey property to make it available to other components.
   * @method showSurvey
   */

  showSurvey(){
    let showUrl = this.common.getUrl(`/survey/${this.surveyFeatured}`);
    
    this.http.get<{success:Boolean,result:Survey}>(showUrl)
    .subscribe(res=>{
      if(res.success){        
            this.survey = res.result;            
            this.surveySub.next(this.survey);              
      }
    })
  }

  /**
   * No parameters, returns a copy of the survey array stored in the survey property
   * @method copySurvey
   */

  copySurvey(){
    return [this.survey];
  }  
  
}
