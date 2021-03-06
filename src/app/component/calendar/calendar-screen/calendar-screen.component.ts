import {Component, OnInit, ViewChild} from '@angular/core';
import {AppbarService} from '../../../service/appbar.service';
import {AppointmentService} from '../../../service/appointment.service';
import {NavigationItem} from '../../../class/navigation-item';
import {WeekViewComponent} from '../week-view/week-view.component';
import * as moment from 'moment';
import {Moment} from 'moment';
import {Appointment, AppointmentType} from '../../../class/appointment';
import {Logger} from '../../../class/logger';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar-screen.component.html',
  styleUrls: ['./calendar-screen.component.scss']
})
export class CalendarScreenComponent implements OnInit {

  @ViewChild(WeekViewComponent) weekView: WeekViewComponent;
  currentAppointmentCountMap: { [key: string]: {[type: number]: number} };
  highlightedDay: Moment;
  currentDay: Moment;
  appointments: Appointment[] = [];


  constructor(
    private appbar: AppbarService,
    private appointmentService: AppointmentService,
  ) {
    Logger.log('Initializing Calendar Screen...');
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
          Logger.log('Switching to previous Month');
          this.weekView.previousMonth();
        }
      ),
      new NavigationItem(
        'Vorherige Woche',
        'chevron-left',
        () => {
          Logger.log('Switching to previous Week');
          this.weekView.previousWeek();
        }
      )
    ]);
    this.appbar.setRightNavigationItems([
      new NavigationItem(
        'Nächste Woche',
        'chevron-right',
        () => {
          Logger.log('Switching to next Week');
          this.weekView.nextWeek();
        }
      ),
      new NavigationItem(
        'Nächster Monat',
        'chevron-double-right',
        () => {
          Logger.log('Switching to next Month');
          this.weekView.nextMonth();
        }
      )
    ]);
  }

  setAppbarTitleFromCurrentDay() {
    this.appbar.setTitle(this.currentDay.format('MMMM YYYY'));
  }

  buildCurrentAppointmentCountMap() {
    const startOfWeek = this.currentDay.clone().startOf('isoWeek');
    const startOfNextWeek = this.currentDay.clone().endOf('isoWeek').add(1, 'day');
    const appointmentCountMap: { [key: string]: {[type: number]: number} } = {};

    let currDay = startOfWeek.clone();
    while (!currDay.isSame(startOfNextWeek, 'day')) {
      const appointments = this.appointmentService.getItemsByDay(currDay);
      appointmentCountMap[currDay.format('YYYYMMD')] = {
        [AppointmentType.TIMETABLE]: appointments.filter(appointment => appointment.type === AppointmentType.TIMETABLE).length,
        [AppointmentType.FREE_TIME]: appointments.filter(appointment => appointment.type === AppointmentType.FREE_TIME).length,
        [AppointmentType.LEARNING_PLAN]: appointments.filter(appointment => appointment.type === AppointmentType.LEARNING_PLAN).length,
        [AppointmentType.EXAM]: appointments.filter(appointment => appointment.type === AppointmentType.EXAM).length,
        [-1]: appointments.filter(appointment => !(appointment.type >= 0)).length
      };
      currDay = currDay.add(1, 'days').clone();
    }

    Logger.log('Built Appointment Count Map for Week View: ' + JSON.stringify(appointmentCountMap));

    this.currentAppointmentCountMap = appointmentCountMap;
  }

  onHighlightedDayChange(day: Moment) {
    this.highlightedDay = day;
    this.refreshAppointments();
  }

  onCurrentDayChange(day: Moment) {
    this.currentDay = day;
    this.setAppbarTitleFromCurrentDay();
    this.buildCurrentAppointmentCountMap();
  }

  refreshAppointments() {
    this.appointments = this.appointmentService.getItemsByDay(this.highlightedDay);
  }

  onAppointmentDeleted() {
    this.refreshAppointments();
    this.buildCurrentAppointmentCountMap();
  }
}
