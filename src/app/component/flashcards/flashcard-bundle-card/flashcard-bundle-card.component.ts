import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import {FlashCardBundle} from '../../../class/flash-card-bundle';

@Component({
  selector: 'app-flashcard-bundle-card',
  templateUrl: './flashcard-bundle-card.component.html',
  styleUrls: ['./flashcard-bundle-card.component.scss']
})
export class FlashcardBundleCardComponent implements OnInit {
  @Input() flashCardBundle: FlashCardBundle;

  constructor() { }

  ngOnInit(): void {
  }

}
