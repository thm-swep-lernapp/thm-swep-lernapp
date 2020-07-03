import {Component, OnInit, ViewChild} from '@angular/core';
import {AppbarService} from '../../../service/appbar.service';
import {AppointmentService} from '../../../service/appointment.service';
import {NavigationItem} from '../../../class/navigation-item';
import {WeekViewComponent} from '../week-view/week-view.component';
import * as moment from 'moment';
import {Moment} from 'moment';
import {Appointment} from '../../../class/appointment';

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
  appointments: Appointment[] = [];


  constructor(
    private appbar: AppbarService,
    private appointmentService: AppointmentService,
  ) {
    this.onCurrentDayChange(moment.utc());
    this.onHighlightedDayChange(moment.utc());
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
    const startOfWeek = this.currentDay.clone().startOf('isoWeek');
    const startOfNextWeek = this.currentDay.clone().endOf('isoWeek').add(1, 'day');
    const appointmentCountMap: { [key: string]: number } = {};

    let currDay = startOfWeek.clone();
    while (!currDay.isSame(startOfNextWeek, 'day')) {
      console.log('jooooo');
      appointmentCountMap[currDay.format('YYYYMMD')] = this.appointmentService.getItems().filter(appointment => {
       return  currDay.isBetween(appointment.start, appointment.end) || currDay.isSame(appointment.start, 'day') || currDay.isSame(appointment.end, 'day');
      }).length;
      currDay = currDay.add(1, 'days').clone();
    }

    console.log(appointmentCountMap);
    this.currentAppointmentCountMap = appointmentCountMap;
  }

  onHighlightedDayChange(day: Moment) {
    console.log(day);
    this.highlightedDay = day;
    this.refreshAppointments();
  }

  onCurrentDayChange(day: Moment) {
    this.currentDay = day;
    this.setAppbarTitleFromCurrentDay();
    this.buildCurrentAppointmentCountMap();
  }

  refreshAppointments() {
    this.appointments = this.appointmentService.getItems().filter(appointment => {
      return this.highlightedDay.isBetween(appointment.start, appointment.end) || this.highlightedDay.isSame(appointment.start, 'day') || this.highlightedDay.isSame(appointment.end, 'day');
    });
  }

  onAppointmentDeleted() {
    this.refreshAppointments();
  }
}
