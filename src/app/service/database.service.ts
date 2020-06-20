import { Injectable } from '@angular/core';
import {PersistableEntity} from '../class/persistable-entity';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor() { }

  sync<T>(key: string, objects: T[]) {
    localStorage.setItem('swep_' + key, JSON.stringify(objects));
  }

  read<T extends PersistableEntity>(key: string, creator: (new () => T)): T[] {
    const jsonList = localStorage.getItem('swep_' + key);
    if (jsonList == null) { return []; }
    const parsedJson = JSON.parse(jsonList);
    const objects = [];
    for (const json of parsedJson) {
      const object = new creator();
      object.fromJSON(json);
      objects.push(object);
    }
    return objects;
  }
}
