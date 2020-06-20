import {Component, Input, OnInit} from '@angular/core';
import {AppbarService} from '../../service/appbar.service';
import {NavigationItem} from '../../class/navigation-item';
import {filter} from 'rxjs/operators';
import {NavigationStart, Router} from '@angular/router';

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
    private router: Router,
    private appbar: AppbarService
  ) {
    this.appbar.titleChanges.subscribe(title => this.title = title);
    this.appbar.leftNavigationItemChanges.subscribe(items => this.leftNavigationItems = items);
    this.appbar.rightNavigationItemChanges.subscribe(items => this.rightNavigationItems = items);

    this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe((event: NavigationStart) => {
        this.leftNavigationItems = [];
        this.rightNavigationItems = [];
      });
  }

  ngOnInit(): void {

  }

}
