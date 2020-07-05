import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationStart, Router} from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-bottomnav',
  templateUrl: './bottomnav.component.html',
  styleUrls: ['./bottomnav.component.scss']
})
export class BottomnavComponent implements OnInit {

  private url = '/termine';

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

  isCalendarActive() {
    return this.url.startsWith('/termine');
  }

  isGradesActive() {
    return this.url.startsWith('/leistungen');
  }

  isDecksActive() {
    return this.url.startsWith('/decks');
  }
}
