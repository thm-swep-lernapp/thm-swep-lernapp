import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradesScreenComponent } from './grades-screen.component';

describe('GradesComponent', () => {
  let component: GradesScreenComponent;
  let fixture: ComponentFixture<GradesScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradesScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradesScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
