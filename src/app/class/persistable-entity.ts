import {JsonHelper} from './json-helper';

export abstract class PersistableEntity {
  fromJSON(json: any) {
    JsonHelper.assignMatchingValuesFromJson(this, json);
  }

  abstract getPrimaryId(): string;
}
