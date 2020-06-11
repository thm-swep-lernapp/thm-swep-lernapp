import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardBundleCardListComponent } from './flashcard-bundle-card-list.component';

describe('FlashcardBundleCardListComponent', () => {
  let component: FlashcardBundleCardListComponent;
  let fixture: ComponentFixture<FlashcardBundleCardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashcardBundleCardListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardBundleCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
