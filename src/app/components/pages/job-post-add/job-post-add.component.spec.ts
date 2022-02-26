import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPostAddComponent } from './job-post-add.component';

describe('JobPostAddComponent', () => {
  let component: JobPostAddComponent;
  let fixture: ComponentFixture<JobPostAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobPostAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobPostAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
