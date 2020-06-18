import { Injectable } from '@angular/core';
import {PersistableEntity} from '../class/persistable-entity';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor() { }

  sync<T>(key: string, objects: T[]) {
    localStorage.setItem("swep_" + key, JSON.stringify(objects));
  }

  read<T extends PersistableEntity>(key: string, creator: { new(): T; }): T[] {
    let jsonList = localStorage.getItem("swep_" + key);
    if (jsonList == null) { return [] }
    let objects = [];
    for (let json of jsonList) {
      let object = new creator();
      object.fromJSON(json);
      objects.push(object);
    }
    return objects;
  }
}
