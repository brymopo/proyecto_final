import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { Survey } from '../../../models/survey';
import { SurveyService } from '../../../services/survey.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css']
})
export class SurveyListComponent implements OnInit, OnDestroy {
  /**
   * Copy of the userInfo object of User Service; contains all user's data.
   * @property userInfo
   */

  private userInfo:User;

  /**
   * Array containing the survey info that will be displayed in the view. Should always have length of 1
   * @property survey
   */

  public survey:Survey[]=[];

  private userSub = new Subscription();
  private surveySub = new Subscription();


  constructor(private userService: UserService,
              private surveyService: SurveyService,
              private route:ActivatedRoute) {

  }

  ngOnInit() {   

    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      const surveyId = paramMap.get('surveyId');
      this.surveyService.surveyFeatured = surveyId;

        if(surveyId==='loggedInUser'){
          
          this.survey = this.userService.copyUserInfo().survey;

          this.userSub = this.userService
          .getUserDataObservable()
          .subscribe((user:User) => {          
            this.survey = user.survey;        
          })
        }else{   
          
          this.surveyService.showSurvey();
          this.survey = this.surveyService.copySurvey();
          this.surveySub = this.surveyService.getSurveyAsObservable()
          .subscribe((survey:Survey)=>{
            this.survey = [survey];            
          })
        }
    });    

  }

  ngOnDestroy() {
    if (this.userSub){
      this.userSub.unsubscribe();
    }
    
    if (this.surveySub){
      this.surveySub.unsubscribe();
    }

  }

  deleteSurvey() {    
    this.surveyService.deleteSurvey(this.survey[0]._id);
  }

  /**
   * No params. if true, signals to use the logged-in user's survey info.
   * @method isLoggedInUser
   */
  isLoggedInUser(){
    return this.surveyService.surveyFeatured==='loggedInUser'
  }  
  
  
}
