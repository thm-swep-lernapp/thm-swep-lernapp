import { Component, OnInit } from '@angular/core';
import {FlashcardService} from '../../../service/flashcard.service';
import {FormControl, Validators} from '@angular/forms';
import {FlashCard} from '../../../class/flash-card';
import {FlashCardBundle} from '../../../class/flash-card-bundle';
import {AppbarService} from '../../../service/appbar.service';
import {Logger} from '../../../class/logger';


@Component({
  selector: 'app-flashcard-bundle-list-screen',
  templateUrl: './flashcard-bundle-list-screen.component.html',
  styleUrls: ['./flashcard-bundle-list-screen.component.scss']
})
export class FlashcardBundleListScreenComponent implements OnInit {

  cardDecks: FlashCardBundle[];

  constructor(
    private flashcardService: FlashcardService,
    private appbar: AppbarService,
  ) {
    Logger.log('Initializing Flashcard Bundle List Screen...');
  }

  ngOnInit(): void {
    this.cardDecks = this.flashcardService.flashcardBundles;

    this.appbar.setTitle('Lernen');
  }

}
