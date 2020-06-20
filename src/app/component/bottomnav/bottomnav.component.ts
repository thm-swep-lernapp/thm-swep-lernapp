import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationStart, Router} from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-bottomnav',
  templateUrl: './bottomnav.component.html',
  styleUrls: ['./bottomnav.component.scss']
})
export class BottomnavComponent implements OnInit {

  private url = '/';

  constructor(
    private router: Router
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe((event: NavigationStart) => {
        this.url = event.url;
      });
  }

  ngOnInit(): void {
  }

  private isCalendarActive() {
    return this.url.startsWith('/termine');
  }

  private isGradesActive() {
    return this.url.startsWith('/leistungen');
  }

  private isDecksActive() {
    return this.url.startsWith('/decks');
  }
}
