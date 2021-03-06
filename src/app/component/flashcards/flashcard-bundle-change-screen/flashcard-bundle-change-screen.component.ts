import { Component, OnInit } from '@angular/core';
import {FlashcardService} from '../../../service/flashcard.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, ValidationErrors, Validators} from '@angular/forms';
import {Module} from '../../../class/module';
import {NavigationItem} from '../../../class/navigation-item';
import {AppbarService} from '../../../service/appbar.service';
import {Grade} from '../../../class/grade';
import {FlashCardBundle} from '../../../class/flash-card-bundle';
import {ModuleService} from '../../../service/module.service';
import {ModulePickerValidators} from '../../module-picker/module-picker-validators';
import {Logger} from '../../../class/logger';

@Component({
  selector: 'app-flashcard-bundle-change-screen',
  templateUrl: './flashcard-bundle-change-screen.component.html',
  styleUrls: ['./flashcard-bundle-change-screen.component.scss']
})
export class FlashcardBundleChangeScreenComponent implements OnInit {

  moduleControl = new FormControl(null, [ModulePickerValidators.isModuleOrNull] );
  titleControl = new FormControl('', [Validators.required]);

  isCreation: boolean;
  flashCardBundle: FlashCardBundle;

  constructor(
    private flashcardService: FlashcardService,
    private route: ActivatedRoute,
    private router: Router,
    private appbar: AppbarService,
    private modules: ModuleService,
  ) {
    Logger.log('Initializing Flashcard Bundle Change Screen...');
    route.paramMap.subscribe(params => {
      const id = params.get('flashcardBundleId');
      if (id === 'neu') {
        this.isCreation = true;
        this.flashCardBundle = new FlashCardBundle();
      } else {
        this.isCreation = false;
        this.flashCardBundle = this.flashcardService.getFlashCardBundleById(id);
        if (this.flashCardBundle.moduleId){
          this.moduleControl.setValue(this.modules.getItemById(this.flashCardBundle.moduleId));
        }
        this.titleControl.setValue(this.flashCardBundle.name);
      }
    });
  }

  ngOnInit(): void {

    this.appbar.setTitle(this.isCreation ? 'Neues Karteikartendeck' : 'Karteikartendeck bearbeiten');
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
          this.flashcardService.deleteFlashcardBundle(this.flashCardBundle);
          this.close();
        }
      ));
    }
  }

  save() {

    if (this.isCreation){
      this.flashcardService.createFlashcardBundle(this.titleControl.value, this.moduleControl.value);

    }else {
      this.flashCardBundle.name = this.titleControl.value;
      if (this.moduleControl.value instanceof Module) {
        this.flashCardBundle.moduleId = this.moduleControl.value.moduleId;
      }

      this.flashcardService.updateFlashcardBundle(this.flashCardBundle);
    }


    this.close();
  }

  private close() {
    this.router.navigate(['/decks'], { replaceUrl: true });
  }
}
