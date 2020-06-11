import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeCardListComponent } from './grade-card-list.component';

describe('GradeCardListComponent', () => {
  let component: GradeCardListComponent;
  let fixture: ComponentFixture<GradeCardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradeCardListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
