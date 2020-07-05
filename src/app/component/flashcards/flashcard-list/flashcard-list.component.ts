import {Component, Input, OnInit} from '@angular/core';
import {FlashCard} from '../../../class/flash-card';
import {FlashCardBundle} from '../../../class/flash-card-bundle';

@Component({
  selector: 'app-flashcard-list',
  templateUrl: './flashcard-list.component.html',
  styleUrls: ['./flashcard-list.component.scss']
})
export class FlashcardListComponent implements OnInit {
  @Input() flashCards: FlashCard[];
  @Input() flashCardBundle: FlashCardBundle;

  constructor() { }

  ngOnInit(): void {
  }

}
