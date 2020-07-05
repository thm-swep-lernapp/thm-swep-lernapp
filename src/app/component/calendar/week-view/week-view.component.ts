import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Moment} from 'moment';
import * as moment from 'moment';
import {Appointment, AppointmentType} from '../../../class/appointment';

@Component({
  selector: 'app-week-view',
  templateUrl: './week-view.component.html',
  styleUrls: ['./week-view.component.scss']
})
export class WeekViewComponent implements OnInit {

  AppointmentType: AppointmentType;
  @Output() highlightedDayChange: EventEmitter<Moment> = new EventEmitter();
  @Output() currentDayChange: EventEmitter<Moment> = new EventEmitter();
  @Input() appointmentCountMap: { [key: string]: {[type: number]: number } };
  highlightedDay: Moment;
  currentDay: Moment;
  days: Moment[];

  private static readonly MAX_DAY_INDICATORS = 2;

  constructor() {
    this.highlightedDay = moment.utc();
    this.currentDay = moment.utc();
    this.buildWeekDaysFromCurrentDay();

  }

  ngOnInit(): void {
  }

  setHighlightedDay(day: Moment) {
    this.highlightedDay = day;
    this.highlightedDayChange.emit(this.highlightedDay);
  }

  previousMonth() {
    this.currentDay.add(-1, 'month');
    this.buildWeekDaysFromCurrentDay();
    this.currentDayChange.emit(this.currentDay);
  }

  previousWeek() {
    this.currentDay.add(-1, 'week');
    this.buildWeekDaysFromCurrentDay();
    this.currentDayChange.emit(this.currentDay);
  }

  nextWeek() {
    this.currentDay.add(1, 'week');
    this.buildWeekDaysFromCurrentDay();
    this.currentDayChange.emit(this.currentDay);
  }

  nextMonth() {
    this.currentDay.add(1, 'month');
    this.buildWeekDaysFromCurrentDay();
    this.currentDayChange.emit(this.currentDay);
  }

  buildWeekDaysFromCurrentDay() {
    const startOfWeek = this.currentDay.clone().startOf('isoWeek');
    const endOfWeek = this.currentDay.clone().endOf('isoWeek');
    this.createCalendarDaysFromFirstAndLastDays(startOfWeek, endOfWeek);
  }

  createCalendarDaysFromFirstAndLastDays(firstDay: Moment, lastDay: Moment) {
    this.days = [];
    this.days.push(firstDay);
    let currDay = firstDay.clone();
    while (currDay.diff(lastDay, 'days') !== 0) {
      this.days.push(currDay);
      currDay = currDay.add(1, 'days').clone();
    }
  }

  getAppointmentDateIndicatorsForDay(day: Moment): AppointmentDateIndicator[] {
    const countMapForDay = this.appointmentCountMap[day.format('YYYYMMD')];
    if (!countMapForDay) { return; }
    let indicators: AppointmentDateIndicator[] = [];

    indicators = indicators.concat(this.getAppointmentDateIndicatorsForTypeAndCount(AppointmentType.EXAM, countMapForDay[AppointmentType.EXAM]));
    indicators = indicators.concat(this.getAppointmentDateIndicatorsForTypeAndCount(AppointmentType.LEARNING_PLAN, countMapForDay[AppointmentType.LEARNING_PLAN]));
    indicators = indicators.concat(this.getAppointmentDateIndicatorsForTypeAndCount(AppointmentType.TIMETABLE, countMapForDay[AppointmentType.TIMETABLE]));
    indicators = indicators.concat(this.getAppointmentDateIndicatorsForTypeAndCount(AppointmentType.FREE_TIME, countMapForDay[AppointmentType.FREE_TIME]));
    indicators = indicators.concat(this.getAppointmentDateIndicatorsForTypeAndCount(-1, countMapForDay[-1]));

    if (indicators.length > WeekViewComponent.MAX_DAY_INDICATORS) {
      const moreLength = indicators.length - WeekViewComponent.MAX_DAY_INDICATORS;
      indicators.length = WeekViewComponent.MAX_DAY_INDICATORS;
      indicators.push(new AppointmentDateIndicator('more', null, moreLength));
    }

    return indicators;
  }

  getAppointmentDateIndicatorsForTypeAndCount(type: number, count: number): AppointmentDateIndicator[] {
    return [...Array(count)].map(_ => new AppointmentDateIndicator('color', Appointment.getTypeColorFromType(type)));
  }
}

export class AppointmentDateIndicator {
  type: 'color' | 'more';
  color: string;
  count: number;


  constructor(type: ('color' | 'more'), color: string, count: number = 0) {
    this.type = type;
    this.color = color;
    this.count = count;
  }
}
