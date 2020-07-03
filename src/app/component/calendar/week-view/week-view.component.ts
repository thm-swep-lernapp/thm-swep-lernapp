import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Moment} from 'moment';
import * as moment from 'moment';

@Component({
  selector: 'app-week-view',
  templateUrl: './week-view.component.html',
  styleUrls: ['./week-view.component.scss']
})
export class WeekViewComponent implements OnInit {

  @Output() highlightedDayChange: EventEmitter<Moment> = new EventEmitter();
  @Output() currentDayChange: EventEmitter<Moment> = new EventEmitter();
  @Input() appointmentCountMap: { [key: string]: number };
  highlightedDay: Moment;
  currentDay: Moment;
  days: Moment[];

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


}
