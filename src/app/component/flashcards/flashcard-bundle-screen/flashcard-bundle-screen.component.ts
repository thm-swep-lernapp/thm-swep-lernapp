import {Component, Input, OnInit} from '@angular/core';
import { FlashcardService} from '../../../service/flashcard.service';
import {FlashcardListComponent} from '../flashcard-list/flashcard-list.component';
import {FlashCard} from '../../../class/flash-card';
import {ActivatedRoute, Router} from '@angular/router';
import {Grade} from '../../../class/grade';
import {FlashCardBundle} from '../../../class/flash-card-bundle';
import {AppbarService} from '../../../service/appbar.service';

@Component({
  selector: 'app-flashcard-bundle-screen',
  templateUrl: './flashcard-bundle-screen.component.html',
  styleUrls: ['./flashcard-bundle-screen.component.scss']
})
export class FlashcardBundleScreenComponent implements OnInit {
  flashCardBundle: FlashCardBundle;

  constructor(private flashcardService: FlashcardService,
              private route: ActivatedRoute,
              private router: Router,
              private appbar: AppbarService) {

    route.paramMap.subscribe(params => {
      const id = params.get('flashcardBundleId');
      this.flashCardBundle = this.flashcardService.getFlashCardBundleById(id);
    });
  }

  ngOnInit(): void {
    this.appbar.setTitle(this.flashCardBundle.name);
  }

  add() {
    this.router.navigate(['decks/' + this.flashCardBundle.flashCardBundleId + '/karte/neu']);
  }
}
