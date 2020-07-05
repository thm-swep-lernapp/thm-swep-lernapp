import {PersistableEntity} from './persistable-entity';
import {FlashCard} from './flash-card';
import { v4 as uuidv4 } from 'uuid';

export class FlashCardBundle extends PersistableEntity{
  flashCardBundleId: string = uuidv4();
  moduleId: string;
  name: string;
  flashCards: FlashCard[] = [];

  getPrimaryId(): string {
    return this.flashCardBundleId;
  }
}
