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
}
