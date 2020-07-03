import { Component, OnInit } from '@angular/core';
import {FormControl, ValidationErrors, Validators} from '@angular/forms';
import {FlashcardService} from '../../../service/flashcard.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Module} from '../../../class/module';
import {FlashCardBundle} from '../../../class/flash-card-bundle';
import {FlashCard} from '../../../class/flash-card';
import {Grade} from '../../../class/grade';
import {NavigationItem} from '../../../class/navigation-item';
import {AppbarService} from '../../../service/appbar.service';

@Component({
  selector: 'app-flashcard-change-screen',
  templateUrl: './flashcard-change-screen.component.html',
  styleUrls: ['./flashcard-change-screen.component.scss']
})
export class FlashcardChangeScreenComponent implements OnInit {
  flashCardBundle: FlashCardBundle;
  flashCard: FlashCard;
  isCreation: boolean;

  questionControl = new FormControl(null);
  answerControl = new FormControl(null);

  constructor(
    private flashcardService: FlashcardService,
    private route: ActivatedRoute,
    private router: Router,
    private appbar: AppbarService,
  ) {
    route.paramMap.subscribe(params => {
      const flashcardBundleId = params.get('flashcardBundleId');
      this.flashCardBundle = this.flashcardService.getFlashCardBundleById(flashcardBundleId);
      const id = params.get('flashcardId');
      if (id === 'neu') {
        this.isCreation = true;
        this.flashCard = new FlashCard();
      } else {
        this.isCreation = false;
        this.flashCard = this.flashcardService.getFlashCardInBundleById(this.flashCardBundle, id);
        this.questionControl.setValue(this.flashCard.front);
        this.answerControl.setValue(this.flashCard.back);
      }
    });
  }

  ngOnInit(): void {
    this.appbar.setTitle(this.isCreation ? 'Neue Karteikarte' : 'Karteikarte bearbeiten');
    this.appbar.setLeftNavigationItem(new NavigationItem(
      'Schließen',
      'close',
      () => {
        this.close();
      }
    ));
    if (!this.isCreation) {
      this.appbar.setRightNavigationItem(new NavigationItem(
        'Löschen',
        'delete',
        () => {
          this.flashcardService.deleteFlashcardFromBundle(this.flashCardBundle, this.flashCard);
          this.close();
        }
      ));
    }
  }

  save() {
    this.flashCard.front = this.questionControl.value;
    this.flashCard.back = this.answerControl.value;
    if (this.isCreation) {
      this.flashcardService.addFlashcardToBundle(this.flashCardBundle, this.flashCard);
    } else {
      this.flashcardService.updateFlashcardInBundle(this.flashCardBundle, this.flashCard);
    }
    this.close();
  }

  close() {
    this.router.navigate(['decks/' + this.flashCardBundle.flashCardBundleId], { replaceUrl: true });
  }
}
