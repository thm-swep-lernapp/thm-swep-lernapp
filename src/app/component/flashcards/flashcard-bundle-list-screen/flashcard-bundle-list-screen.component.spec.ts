import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardBundleListScreenComponent } from './flashcard-bundle-list-screen.component';

describe('FlashcardBundleListScreenComponent', () => {
  let component: FlashcardBundleListScreenComponent;
  let fixture: ComponentFixture<FlashcardBundleListScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashcardBundleListScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardBundleListScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
