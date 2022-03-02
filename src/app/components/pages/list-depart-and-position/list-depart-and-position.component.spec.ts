import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDepartAndPositionComponent } from './list-depart-and-position.component';

describe('ListDepartAndPositionComponent', () => {
  let component: ListDepartAndPositionComponent;
  let fixture: ComponentFixture<ListDepartAndPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDepartAndPositionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDepartAndPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
