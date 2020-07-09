import { Component, OnInit } from '@angular/core';
import {NavigationItem} from '../../../class/navigation-item';
import {AppbarService} from '../../../service/appbar.service';
import {FlashcardService} from '../../../service/flashcard.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FlashCardBundle} from '../../../class/flash-card-bundle';
import {FlashCard} from '../../../class/flash-card';
import {Logger} from '../../../class/logger';

@Component({
  selector: 'app-learn-screen',
  templateUrl: './learn-screen.component.html',
  styleUrls: ['./learn-screen.component.scss']
})
export class LearnScreenComponent implements OnInit {
  private flashCardBundle: FlashCardBundle;
  public turnCard = 'front';
  private flashCards: FlashCard[];
  public activeCard: FlashCard;
  private index = 0;
  public progress: string;

  constructor(
    private appbar: AppbarService,
    private flashcardService: FlashcardService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    Logger.log('Initializing Learn Screen...');
    route.paramMap.subscribe(params => {
      const id = params.get('flashcardBundleId');
      this.flashCardBundle = this.flashcardService.getFlashCardBundleById(id);
    });
  }

  ngOnInit(): void {
    this.appbar.setTitle(this.flashCardBundle.name + ' durcharbeiten');
    this.appbar.setLeftNavigationItems([
      new NavigationItem(
        'Durcharbeiten',
        'close',
        () => {
          this.router.navigate(['decks/' + this.flashCardBundle.flashCardBundleId]);
        }
      )
    ]);

    this.flashCards = this.flashcardService.getAllFlashcardsInBundle(this.flashCardBundle);

    this.activeCard = this.flashCards[0];

    this.DisplayLearnProgress();
  }

  nextCard() {

    if (this.turnCard === 'back') {
      this.turnCard = 'front';
    }
    this.index ++;
    this.activeCard = this.flashCards[this.index];
    this.DisplayLearnProgress();

  }

  TurnButton() {
    if (this.turnCard === 'front') {
      this.turnCard = 'back';
    } else {
      this.turnCard = 'front';
    }
  }

  DisplayLearnProgress() {
    if (this.index + 1 === this.flashCards.length + 1) {
      this.close();
    }
    let cardCount;
    if (this.flashCards.length <= 1) {
      cardCount = ' Karte';
    } else {
      cardCount = ' Karten';
    }
    this.progress = (this.index + 1) + '/' + this.flashCards.length + cardCount;
  }

  close() {
    this.router.navigate(['decks/' + this.flashCardBundle.flashCardBundleId], { replaceUrl: true });
  }

}
