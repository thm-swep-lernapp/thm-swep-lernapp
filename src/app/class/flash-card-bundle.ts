import {PersistableEntity} from './persistable-entity';
import {FlashCard} from './flash-card';
import { uuid } from 'uuid';

export class FlashCardBundle extends PersistableEntity{
  flashCardBundleId: string = uuid.v4();
  moduleId: string;
  name: string;
  flashCards: FlashCard[] = [];
}
