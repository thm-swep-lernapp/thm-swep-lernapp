import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeChangeScreenComponent } from './grade-change-screen.component';

describe('NewGradeComponent', () => {
  let component: GradeChangeScreenComponent;
  let fixture: ComponentFixture<GradeChangeScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradeChangeScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeChangeScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
