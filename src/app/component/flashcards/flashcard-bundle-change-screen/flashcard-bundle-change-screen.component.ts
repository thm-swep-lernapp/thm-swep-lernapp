import { Component, OnInit } from '@angular/core';
import {FlashcardService} from '../../../service/flashcard.service';
import {ActivatedRoute} from '@angular/router';
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
    public route: ActivatedRoute,
  ) { }

  ngOnInit(): void {


  }

  isModule(control: FormControl): ValidationErrors {
    return control.value === null || control.value instanceof Module ? null : { isModule: false };
  }

  save() {

  }
}
