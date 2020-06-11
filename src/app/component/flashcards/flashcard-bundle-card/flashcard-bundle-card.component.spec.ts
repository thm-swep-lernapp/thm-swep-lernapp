import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardBundleCardComponent } from './flashcard-bundle-card.component';

describe('FlashcardBundleCardComponent', () => {
  let component: FlashcardBundleCardComponent;
  let fixture: ComponentFixture<FlashcardBundleCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashcardBundleCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardBundleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
