import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnScreenComponent } from './learn-screen.component';

describe('LearnScreenComponent', () => {
  let component: LearnScreenComponent;
  let fixture: ComponentFixture<LearnScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearnScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
