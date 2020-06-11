import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarScreenComponent } from './calendar-screen.component';

describe('CalendarComponent', () => {
  let component: CalendarScreenComponent;
  let fixture: ComponentFixture<CalendarScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
