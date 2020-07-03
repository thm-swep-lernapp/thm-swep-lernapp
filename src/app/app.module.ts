import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AppbarComponent } from './component/appbar/appbar.component';
import {BottomnavComponent} from './component/bottomnav/bottomnav.component';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import { WeekViewComponent } from './component/calendar/week-view/week-view.component';
import { AppointmentListComponent } from './component/calendar/appointment-list/appointment-list.component';
import { AppointmentListItemComponent } from './component/calendar/appointment-list-item/appointment-list-item.component';
import { CalendarScreenComponent } from './component/calendar/calendar-screen/calendar-screen.component';
import { AppointmentScreenComponent } from './component/calendar/appointment-screen/appointment-screen.component';
import { GradesScreenComponent } from './component/grades/grades-screen/grades-screen.component';
import { GradeCardComponent } from './component/grades/grade-card/grade-card.component';
import { GradeCardListComponent } from './component/grades/grade-card-list/grade-card-list.component';
import { GradeChangeScreenComponent } from './component/grades/grade-change-screen/grade-change-screen.component';
import { FlashcardBundleScreenComponent } from './component/flashcards/flashcard-bundle-screen/flashcard-bundle-screen.component';
import { FlashcardBundleCardListComponent } from './component/flashcards/flashcard-bundle-card-list/flashcard-bundle-card-list.component';
import { FlashcardBundleCardComponent } from './component/flashcards/flashcard-bundle-card/flashcard-bundle-card.component';
import { FlashcardBundleChangeScreenComponent } from './component/flashcards/flashcard-bundle-change-screen/flashcard-bundle-change-screen.component';
import { FlashcardBundleListScreenComponent } from './component/flashcards/flashcard-bundle-list-screen/flashcard-bundle-list-screen.component';
import { FlashcardListComponent } from './component/flashcards/flashcard-list/flashcard-list.component';
import { FlashcardComponent } from './component/flashcards/flashcard/flashcard.component';
import { FlashcardChangeScreenComponent } from './component/flashcards/flashcard-change-screen/flashcard-change-screen.component';
import { LearnScreenComponent } from './component/flashcards/learn-screen/learn-screen.component';
import {HttpClientModule} from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {ModuleService} from './service/module.service';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {ReactiveFormsModule} from '@angular/forms';
import {OverlayModule} from '@angular/cdk/overlay';
import { ModulePickerComponent } from './component/module-picker/module-picker.component';
import {MatSliderModule} from '@angular/material/slider';
import { EmptyStateComponent } from './component/empty-state/empty-state.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {OWL_DATE_TIME_FORMATS, OwlDateTimeModule, OwlMomentDateTimeModule} from '@danielmoncada/angular-datetime-picker';


export const MY_MOMENT_FORMATS = {
  parseInput: 'l LT',
  fullPickerInput: 'l LT',
  datePickerInput: 'l',
  timePickerInput: 'LT',
  monthYearLabel: 'MMM YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMMM YYYY',
};

@NgModule({
  declarations: [
    AppComponent,
    AppbarComponent,
    BottomnavComponent,
    WeekViewComponent,
    AppointmentListComponent,
    AppointmentListItemComponent,
    CalendarScreenComponent,
    AppointmentScreenComponent,
    GradesScreenComponent,
    GradeCardComponent,
    GradeCardListComponent,
    GradeChangeScreenComponent,
    FlashcardBundleScreenComponent,
    FlashcardBundleCardListComponent,
    FlashcardBundleCardComponent,
    FlashcardBundleChangeScreenComponent,
    FlashcardBundleListScreenComponent,
    FlashcardListComponent,
    FlashcardComponent,
    FlashcardChangeScreenComponent,
    LearnScreenComponent,
    ModulePickerComponent,
    EmptyStateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    OverlayModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatSnackBarModule,
    MatSelectModule,
    NgxMaterialTimepickerModule,
    OwlDateTimeModule,
    OwlMomentDateTimeModule
  ],
  providers: [ {provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_FORMATS}],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer){
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg'));
  }
}
