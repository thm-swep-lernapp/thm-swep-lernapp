import { uuid } from 'uuid';

export class FlashCard {
  flashCardId: string = uuid.v4();
  front: string;
  back: string;
  rank: number;
}
