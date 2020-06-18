import { Injectable } from '@angular/core';
import {DatabaseService} from './database.service';
import {FlashCardBundle} from '../class/flash-card-bundle';
import {Module} from '../class/module';
import {FlashCard} from '../class/flash-card';
import {count} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FlashcardService {

  flashcardBundles: FlashCardBundle[];
  private readonly DB_KEY = "flashcard_bundles";

  constructor(
    private db: DatabaseService
  ) {
    this.flashcardBundles = this.db.read(this.DB_KEY, FlashCardBundle);
  }

  createFlashcardBundle(name: string, linkedModule: Module) {
    let bundle = new FlashCardBundle();

    bundle.name = name;
    if (linkedModule) {
      bundle.moduleId = linkedModule.moduleId;
    }

    this.flashcardBundles.push(bundle);
    this.db.sync(this.DB_KEY, this.flashcardBundles);
  }

  deleteFlashcardBundle(flashcardBundle: FlashCardBundle): boolean {
    let index = this.flashcardBundles.findIndex(bundle => bundle.flashCardBundleId === flashcardBundle.flashCardBundleId);
    if (index === -1) { return false; }
    this.flashcardBundles.splice(index, 1);
    this.db.sync(this.DB_KEY, this.flashcardBundles);
  }

  addFlashcardToBundle(flashcardBundle: FlashCardBundle, flashcard: FlashCard): boolean {
    let index = this.flashcardBundles.findIndex(bundle => bundle.flashCardBundleId === flashcardBundle.flashCardBundleId);
    if (index === -1) { return false; }
    this.flashcardBundles[index].flashCards.push(flashcard);
    this.db.sync(this.DB_KEY, this.flashcardBundles);
    return true;
  }

  updateFlashcardInBundle(flashcardBundle: FlashCardBundle, flashcard: FlashCard): boolean {
    let indices = this.getBundleAndCardIndex(flashcardBundle, flashcard);
    if (indices === null) { return false; }
    this.flashcardBundles[indices[0]].flashCards[indices[1]] = flashcard;
    this.db.sync(this.DB_KEY, this.flashcardBundles);
  }

  deleteFlashcardFromBundle(flashcardBundle: FlashCardBundle, flashcard: FlashCard): boolean {
    let indices = this.getBundleAndCardIndex(flashcardBundle, flashcard);
    if (indices === null) { return false; }
    this.flashcardBundles[indices[0]].flashCards.splice(indices[1], 1);
    this.db.sync(this.DB_KEY, this.flashcardBundles);
  }

  getLowestScoreFlashcardsInBundle(flashcardBundle: FlashCardBundle, amount: number): FlashCard[] {
    let index = this.flashcardBundles.findIndex(bundle => bundle.flashCardBundleId === flashcardBundle.flashCardBundleId);
    if (index === -1) { return null; }

    let lowestScore = 10;
    this.flashcardBundles[index].flashCards.forEach(card => {
      if (lowestScore > card.rank) {
        lowestScore = card.rank;
      }
    });

    return this.flashcardBundles[index].flashCards.filter(function(card) {
      if (this.count < amount && card.rank === lowestScore) {
        this.count++;
        return true;
      }
      return false;
    }, { count: 0 })
  }

  getAllFlashcardsInBundle(flashcardBundle: FlashCardBundle): FlashCard[] {
    let index = this.flashcardBundles.findIndex(bundle => bundle.flashCardBundleId === flashcardBundle.flashCardBundleId);
    if (index === -1) { return null; }

    return this.flashcardBundles[index].flashCards;
  }

  private getBundleAndCardIndex(flashcardBundle: FlashCardBundle, flashcard: FlashCard): [number, number] {
    let index = this.flashcardBundles.findIndex(bundle => bundle.flashCardBundleId === flashcardBundle.flashCardBundleId);
    if (index === -1) { return null; }
    let cardIndex = this.flashcardBundles[index]
      .flashCards.findIndex(card => flashcard.flashCardId === card.flashCardId);
    if (cardIndex === -1) { return null; }
    return [index, cardIndex];
  }
}
