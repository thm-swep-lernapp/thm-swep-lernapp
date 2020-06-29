import { Component, OnInit } from '@angular/core';
import {FlashcardService} from '../../../service/flashcard.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, ValidationErrors, Validators} from '@angular/forms';
import {Module} from '../../../class/module';

@Component({
  selector: 'app-flashcard-bundle-change-screen',
  templateUrl: './flashcard-bundle-change-screen.component.html',
  styleUrls: ['./flashcard-bundle-change-screen.component.scss']
})
export class FlashcardBundleChangeScreenComponent implements OnInit {

  moduleControl = new FormControl(null, [this.isModule] );
  titleControl = new FormControl('', [Validators.required]);

  cardDecks;

  constructor(
    private flashcardService: FlashcardService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {


  }

  isModule(control: FormControl): ValidationErrors {
    return control.value === null || control.value instanceof Module ? null : { isModule: false };
  }

  save() {

    this.flashcardService.createFlashcardBundle(this.titleControl.value, this.moduleControl.value);

    this.close();

  }

  private close() {
    this.router.navigate(['/decks'], { replaceUrl: true });
  }
}
