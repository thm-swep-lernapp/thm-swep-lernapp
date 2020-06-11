import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardBundleChangeScreenComponent } from './flashcard-bundle-change-screen.component';

describe('FlashcardBundleChangeScreenComponent', () => {
  let component: FlashcardBundleChangeScreenComponent;
  let fixture: ComponentFixture<FlashcardBundleChangeScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashcardBundleChangeScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardBundleChangeScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
