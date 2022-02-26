import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobApplicantComponent } from './job-applicant.component';

describe('JobApplicantComponent', () => {
  let component: JobApplicantComponent;
  let fixture: ComponentFixture<JobApplicantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobApplicantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobApplicantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
