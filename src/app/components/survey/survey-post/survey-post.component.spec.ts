import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyPostComponent } from './survey-post.component';

describe('SurveyPostComponent', () => {
  let component: SurveyPostComponent;
  let fixture: ComponentFixture<SurveyPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
