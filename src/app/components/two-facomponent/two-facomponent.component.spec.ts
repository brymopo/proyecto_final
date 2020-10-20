import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoFAComponentComponent } from './two-facomponent.component';

describe('TwoFAComponentComponent', () => {
  let component: TwoFAComponentComponent;
  let fixture: ComponentFixture<TwoFAComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoFAComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoFAComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
