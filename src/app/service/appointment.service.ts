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
      return day.isBetween(appointment.start, appointment.end) || day.isSame(appointment.start, 'day') || day.isSame(appointment.end, 'day');
    });
  }

  protected getDbKey(): string {
    return AppointmentService.DB_KEY;
  }
}
