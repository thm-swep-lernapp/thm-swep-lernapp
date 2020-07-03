import { Injectable } from '@angular/core';
import {Appointment} from '../class/appointment';
import {DatabaseService} from './database.service';
import {BaseCrudService} from './base-crud-service';
import {Moment} from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService extends BaseCrudService<Appointment> {

  private static readonly DB_KEY = 'appointments';

  constructor(db: DatabaseService) {
    super(db, Appointment);
  }

  getItemsByDay(day: Moment): Appointment[] {
    return this.getItems().filter(appointment => {
      let start = appointment.start.clone();
      let end = appointment.end.clone();
      if (appointment.interval && appointment.interval > 0) {
        while (start.isBefore(day, 'day')) {
          start = start.add(appointment.interval, 'second');
          end = end.add(appointment.interval, 'second');
        }
      }
      return day.isBetween(start, end) || day.isSame(start, 'day') || day.isSame(end, 'day');
    });
  }

  protected getDbKey(): string {
    return AppointmentService.DB_KEY;
  }
}
