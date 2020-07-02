import {Component, OnInit, ViewChild} from '@angular/core';
import {AppbarService} from '../../../service/appbar.service';
import {AppointmentService} from '../../../service/appointment.service';
import {NavigationItem} from '../../../class/navigation-item';
import {WeekViewComponent} from '../week-view/week-view.component';
import * as moment from 'moment';
import {Moment} from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar-screen.component.html',
  styleUrls: ['./calendar-screen.component.scss']
})
export class CalendarScreenComponent implements OnInit {

  @ViewChild(WeekViewComponent) weekView: WeekViewComponent;
  currentAppointmentCountMap: { [key: string]: number };
  highlightedDay: Moment;
  currentDay: Moment;

  constructor(
    private appbar: AppbarService,
    private appointmentService: AppointmentService,
  ) {
    this.currentDay = moment.utc();
    this.highlightedDay = moment.utc();
    this.buildCurrentAppointmentCountMap();
  }

  ngOnInit(): void {
    this.setAppbarTitleFromCurrentDay();
    this.appbar.setLeftNavigationItems([
      new NavigationItem(
        'Vorheriger Monat',
        'chevron-double-left',
        () => {
          this.weekView.previousMonth();
        }
      ),
      new NavigationItem(
        'Vorherige Woche',
        'chevron-left',
        () => {
          this.weekView.previousWeek();
        }
      )
    ]);
    this.appbar.setRightNavigationItems([
      new NavigationItem(
        'Nächste Woche',
        'chevron-right',
        () => {
          this.weekView.nextWeek();
        }
      ),
      new NavigationItem(
        'Nächster Monat',
        'chevron-double-right',
        () => {
          this.weekView.nextMonth();
        }
      )
    ]);

    const appointmentsFromDb = this.appointmentService.getItems();

  }

  setAppbarTitleFromCurrentDay() {
    this.appbar.setTitle(this.currentDay.format('MMMM YYYY'));
  }

  buildCurrentAppointmentCountMap() {
    const startOfWeek = this.currentDay.startOf('isoWeek');
    const endOfWeek = this.currentDay.startOf('isoWeek');
    const appointmentCountMap: { [key: string]: number } = {};

    let currDay = startOfWeek.clone();
    while (currDay.diff(endOfWeek, 'days') !== 0) {
      appointmentCountMap[currDay.format('YYYYMMD')] = this.appointmentService.getItems().filter(appointment => {
        currDay.isBetween(appointment.getStartAsMoment(), appointment.getEndAsMoment());
      }).length;
      currDay = currDay.add(1, 'days').clone();
    }

    this.currentAppointmentCountMap = appointmentCountMap;
  }

  onHighlightedDayChange(day: Moment) {
    this.highlightedDay = day;
  }

  onCurrentDayChange(day: Moment) {
    this.currentDay = day;
    this.setAppbarTitleFromCurrentDay();
    this.buildCurrentAppointmentCountMap();
  }
}
