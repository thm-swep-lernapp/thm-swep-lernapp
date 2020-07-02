import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {FlashcardService} from '../../../service/flashcard.service';
import {FlashCard} from '../../../class/flash-card';
import {FlashCardBundle} from '../../../class/flash-card-bundle';

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.scss']
})
export class FlashcardComponent implements OnInit {
  @Input() flashcard: FlashCard;
  @Input() flashCardBundle: FlashCardBundle;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  openCard() {
    this.router.navigate(['decks/' + this.flashCardBundle.flashCardBundleId + '/karte/' + this.flashcard.flashCardId]);
  }
}
