import { Injectable } from '@angular/core';
import {PersistableEntity} from '../class/persistable-entity';
import {Logger} from '../class/logger';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor() { }

  sync<T>(key: string, objects: T[]) {
    Logger.log('Persisting ' +  objects.length + ' Objects in LocalStorage with key: ' + key);
    localStorage.setItem('swep_' + key, JSON.stringify(objects));
  }

  read<T extends PersistableEntity>(key: string, creator: (new () => T)): T[] {
    Logger.log('Reading ' + key + ' from LocalStorage');
    const jsonList = localStorage.getItem('swep_' + key);
    if (jsonList == null) {
      Logger.log('Found no Objects in LocalStorage with key: ' + key);
      return [];
    }
    const parsedJson = JSON.parse(jsonList);
    const objects = [];
    for (const json of parsedJson) {
      const object = new creator();
      object.fromJSON(json);
      objects.push(object);
    }
    Logger.log('Found ' + objects.length + ' Objects in LocalStorage with key: ' + key);
    return objects;
  }
}
