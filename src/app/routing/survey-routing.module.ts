import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SurveyListComponent } from '../components/survey/survey-list/survey-list.component';
import { SurveyPostComponent } from '../components/survey/survey-post/survey-post.component';


const surveyRoutes:Routes=[
    {
        path:"",
        children:[
            {
                path:"editar_encuesta",
                component:SurveyPostComponent
            },
            {
                path:":surveyId",
                component:SurveyListComponent
            }            
        ]    
    },
    
    
]

@NgModule({
    imports:[RouterModule.forChild(surveyRoutes)],
    exports:[RouterModule]
})


export class SurveyRoutingModule{

}