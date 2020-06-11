import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardChangeScreenComponent } from './flashcard-change-screen.component';

describe('FlashcardChangeScreenComponent', () => {
  let component: FlashcardChangeScreenComponent;
  let fixture: ComponentFixture<FlashcardChangeScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashcardChangeScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardChangeScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
