import {TestType} from './test-type.enum';
import {JsonHelper} from './json-helper';
import {PersistableEntity} from './persistable-entity';

export class Module extends PersistableEntity {
  moduleId: string;
  name: string;
  description: string;
  creditPoints: number;
  plannedSemester: number;
  testType: TestType;

  getPrimaryId(): string {
    return this.moduleId;
  }

  getReadableTestType(): string {
    switch (this.testType) {
      case TestType.ORAL_EXAM:
        return 'Mündliche Prüfung';
      case TestType.PROJECT:
        return 'Projekt';
      case TestType.PAPER:
        return 'Hausarbeit';
      case TestType.OTHER:
        return 'Spezielle Prüfung';
      case TestType.MIXED:
        return 'Gemischt';
      case TestType.TEST:
        return 'Klausur';
    }
  }
}
