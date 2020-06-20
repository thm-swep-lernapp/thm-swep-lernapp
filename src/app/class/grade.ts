import {Module} from './module';
import {PersistableEntity} from './persistable-entity';

export class Grade extends PersistableEntity {
  moduleId: string;
  grade: number;
  date: number;

  getPrimaryId(): string {
    return this.moduleId;
  }
}
