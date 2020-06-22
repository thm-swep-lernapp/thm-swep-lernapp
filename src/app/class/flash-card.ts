import { v4 as uuidv4 } from 'uuid';

export class FlashCard {
  flashCardId: string = uuidv4();
  front: string;
  back: string;
  rank: number;
}
