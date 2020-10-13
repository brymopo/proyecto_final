import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SurveyRoutingModule } from '../routing/survey-routing.module';

import { SurveyListComponent } from '../components/survey/survey-list/survey-list.component';
import { SurveyPostComponent } from '../components/survey/survey-post/survey-post.component';

@NgModule({
    declarations:[        
        SurveyListComponent,
        SurveyPostComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
        SurveyRoutingModule
    ],
    exports:[        
        SurveyListComponent,
        SurveyPostComponent
    ]
})

export class SurveyModule{

}