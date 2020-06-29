import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-flashcard-bundle-card',
  templateUrl: './flashcard-bundle-card.component.html',
  styleUrls: ['./flashcard-bundle-card.component.scss']
})
export class FlashcardBundleCardComponent implements OnInit {

  @Input() title;
  @Input() count;

  constructor() { }

  ngOnInit(): void {
  }

}
