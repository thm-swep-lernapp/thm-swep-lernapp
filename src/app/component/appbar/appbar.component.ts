import {Component, Input, OnInit} from '@angular/core';
import {AppbarService} from '../../service/appbar.service';
import {NavigationItem} from '../../class/navigation-item';

@Component({
  selector: 'app-appbar',
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.scss']
})
export class AppbarComponent implements OnInit {

  title = 'LernApp';
  leftNavigationItems: NavigationItem[] = [];
  rightNavigationItems: NavigationItem[] = [];

  constructor(
    private appbar: AppbarService
  ) {
    this.appbar.titleChanges.subscribe(title => this.title = title);
    this.appbar.leftNavigationItemChanges.subscribe(items => this.leftNavigationItems = items);
    this.appbar.rightNavigationItemChanges.subscribe(items => this.rightNavigationItems = items);
  }

  ngOnInit(): void {

  }

}
