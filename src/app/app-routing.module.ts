import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BottomnavComponent} from './component/bottomnav/bottomnav.component';
import {CalendarScreenComponent} from './component/calendar/calendar-screen/calendar-screen.component';
import {AppointmentScreenComponent} from './component/calendar/appointment-screen/appointment-screen.component';
import {FlashcardBundleListScreenComponent} from './component/flashcards/flashcard-bundle-list-screen/flashcard-bundle-list-screen.component';
import {FlashcardBundleChangeScreenComponent} from './component/flashcards/flashcard-bundle-change-screen/flashcard-bundle-change-screen.component';
import {FlashcardChangeScreenComponent} from './component/flashcards/flashcard-change-screen/flashcard-change-screen.component';
import {LearnScreenComponent} from './component/flashcards/learn-screen/learn-screen.component';
import {GradesScreenComponent} from './component/grades/grades-screen/grades-screen.component';
import {GradeChangeScreenComponent} from './component/grades/grade-change-screen/grade-change-screen.component';
import {FlashcardBundleCardListComponent} from './component/flashcards/flashcard-bundle-card-list/flashcard-bundle-card-list.component';


const routes: Routes = [
  { path: '', redirectTo: 'termine', pathMatch: 'full' },
  { path: 'termine', component: CalendarScreenComponent },
  { path: 'termine/neu', component: AppointmentScreenComponent },
  { path: 'termine/:appointmentId', component: AppointmentScreenComponent },
  { path: 'decks', component: FlashcardBundleListScreenComponent },
  { path: 'decks/:flashcardBundleId', component: FlashcardBundleCardListComponent },
  { path: 'decks/:flashcardBundleId/bearbeiten', component: FlashcardBundleChangeScreenComponent },
  { path: 'decks/:flashcardBundleId/karte/:flashcardId', component: FlashcardChangeScreenComponent },
  { path: 'decks/:flashcardBundleId/lernen', component: LearnScreenComponent },
  { path: 'leistungen', component: GradesScreenComponent },
  { path: 'leistungen/:gradeId', component: GradeChangeScreenComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
