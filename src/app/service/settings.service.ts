import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor() { }

  save<T>(key: string, object: T) {
    localStorage.setItem('swep_' + key, JSON.stringify(object));
  }

  read<T>(key: string, defaultValue: T): T {
    const storedValue = localStorage.getItem('swep_' + key);
    if (storedValue === null) { return defaultValue; }
    return JSON.parse(storedValue);
  }
}
