import { Injectable } from '@angular/core';
import {Observable, Observer} from 'rxjs';
import {NavigationItem} from '../class/navigation-item';

@Injectable({
  providedIn: 'root'
})
export class AppbarService {

  titleChanges: Observable<string>;
  leftNavigationItemChanges: Observable<NavigationItem[]>;
  rightNavigationItemChanges: Observable<NavigationItem[]>;

  private titleChangeNotifier: Observer<string>;
  private leftNavigationItemChangeNotifier: Observer<NavigationItem[]>;
  private rightNavigationItemChangeNotifier: Observer<NavigationItem[]>;

  constructor() {
    this.titleChanges = new Observable<string>(observer => this.titleChangeNotifier = observer);
    this.leftNavigationItemChanges = new Observable<NavigationItem[]>(observer => this.leftNavigationItemChangeNotifier = observer);
    this.rightNavigationItemChanges = new Observable<NavigationItem[]>(observer => this.rightNavigationItemChangeNotifier = observer);
  }

  setTitle(title: string) {
    this.titleChangeNotifier.next(title);
  }

  setLeftNavigationItem(item: NavigationItem) {
    this.setLeftNavigationItems([item]);
  }

  setLeftNavigationItems(items: NavigationItem[]) {
    this.leftNavigationItemChangeNotifier.next(items);
  }

  setRightNavigationItem(item: NavigationItem) {
    this.setRightNavigationItems([item]);
  }

  setRightNavigationItems(items: NavigationItem[]) {
    this.rightNavigationItemChangeNotifier.next(items);
  }
}
