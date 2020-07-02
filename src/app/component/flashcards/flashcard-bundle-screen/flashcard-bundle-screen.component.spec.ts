import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardBundleScreenComponent } from './flashcard-bundle-screen.component';

describe('FlashcardBundleCardListComponent', () => {
  let component: FlashcardBundleScreenComponent;
  let fixture: ComponentFixture<FlashcardBundleScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashcardBundleScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardBundleScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
