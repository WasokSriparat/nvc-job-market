import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPostEditComponent } from './job-post-edit.component';

describe('JobPostEditComponent', () => {
  let component: JobPostEditComponent;
  let fixture: ComponentFixture<JobPostEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobPostEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobPostEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
