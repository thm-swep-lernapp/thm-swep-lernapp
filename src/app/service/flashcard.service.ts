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
  private static readonly DB_KEY = 'flashcard_bundles';

  constructor(
    private db: DatabaseService
  ) {
    this.flashcardBundles = this.db.read(FlashcardService.DB_KEY, FlashCardBundle);
  }

  getFlashCardBundleById(id: string): FlashCardBundle {
    return this.flashcardBundles.find(item => item.getPrimaryId() === id);
  }

  createFlashcardBundle(name: string, linkedModule: Module) {
    const bundle = new FlashCardBundle();

    bundle.name = name;
    if (linkedModule) {
      bundle.moduleId = linkedModule.moduleId;
    }

    this.flashcardBundles.push(bundle);
    this.db.sync(FlashcardService.DB_KEY, this.flashcardBundles);
  }

  deleteFlashcardBundle(flashcardBundle: FlashCardBundle): boolean {
    const index = this.flashcardBundles.findIndex(bundle => bundle.flashCardBundleId === flashcardBundle.flashCardBundleId);
    if (index === -1) { return false; }
    this.flashcardBundles.splice(index, 1);
    this.db.sync(FlashcardService.DB_KEY, this.flashcardBundles);
  }

  updateFlashcardBundle(flashcardBundle: FlashCardBundle): boolean {
    const index = this.flashcardBundles.findIndex(bundle => bundle.flashCardBundleId === flashcardBundle.flashCardBundleId);
    if (index === -1) { return false; }
    this.flashcardBundles[index] = flashcardBundle;
    this.db.sync(FlashcardService.DB_KEY, this.flashcardBundles);
  }

  addFlashcardToBundle(flashcardBundle: FlashCardBundle, flashcard: FlashCard): boolean {
    const index = this.flashcardBundles.findIndex(bundle => bundle.flashCardBundleId === flashcardBundle.flashCardBundleId);
    if (index === -1) { return false; }
    this.flashcardBundles[index].flashCards.push(flashcard);
    this.db.sync(FlashcardService.DB_KEY, this.flashcardBundles);
    return true;
  }

  updateFlashcardInBundle(flashcardBundle: FlashCardBundle, flashcard: FlashCard): boolean {
    const indices = this.getBundleAndCardIndex(flashcardBundle, flashcard);
    if (indices === null) { return false; }
    this.flashcardBundles[indices[0]].flashCards[indices[1]] = flashcard;
    this.db.sync(FlashcardService.DB_KEY, this.flashcardBundles);
  }

  deleteFlashcardFromBundle(flashcardBundle: FlashCardBundle, flashcard: FlashCard): boolean {
    const indices = this.getBundleAndCardIndex(flashcardBundle, flashcard);
    if (indices === null) { return false; }
    this.flashcardBundles[indices[0]].flashCards.splice(indices[1], 1);
    this.db.sync(FlashcardService.DB_KEY, this.flashcardBundles);
  }

  getLowestScoreFlashcardsInBundle(flashcardBundle: FlashCardBundle, amount: number): FlashCard[] {
    const index = this.flashcardBundles.findIndex(bundle => bundle.flashCardBundleId === flashcardBundle.flashCardBundleId);
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
    }, { count: 0 });
  }

  getAllFlashcardsInBundle(flashcardBundle: FlashCardBundle): FlashCard[] {
    const index = this.flashcardBundles.findIndex(bundle => bundle.flashCardBundleId === flashcardBundle.flashCardBundleId);
    if (index === -1) { return null; }

    return this.flashcardBundles[index].flashCards;
  }

  private getBundleAndCardIndex(flashcardBundle: FlashCardBundle, flashcard: FlashCard): [number, number] {
    const index = this.flashcardBundles.findIndex(bundle => bundle.flashCardBundleId === flashcardBundle.flashCardBundleId);
    if (index === -1) { return null; }
    const cardIndex = this.flashcardBundles[index]
      .flashCards.findIndex(card => flashcard.flashCardId === card.flashCardId);
    if (cardIndex === -1) { return null; }
    return [index, cardIndex];
  }

  getFlashCardBundleById(id: string): FlashCardBundle {
    return this.flashcardBundles.find(bundle => bundle.flashCardBundleId === id);
  }

  getFlashCardInBundleById(flashCardBundle: FlashCardBundle, id: string): FlashCard {
    return flashCardBundle.flashCards.find(card => card.flashCardId === id);
  }
}
