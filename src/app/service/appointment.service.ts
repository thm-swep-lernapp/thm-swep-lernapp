import { Injectable } from '@angular/core';
import {Appointment} from '../class/appointment';
import {DatabaseService} from './database.service';
import {ReminderService} from './reminder.service';
import {BaseCrudService} from './base-crud-service';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService extends BaseCrudService<Appointment> {

  private static readonly DB_KEY = 'appointments';

  constructor(
    db: DatabaseService,
    private reminders: ReminderService
  ) {
    super(db, Appointment);
  }

  updateItem(item: Appointment): boolean {
    this.reminders.updateReminderForAppointment(item);
    return super.updateItem(item);
  }

  deleteItem(item: Appointment): boolean {
    this.reminders.deleteReminderForAppointment(item);
    return super.deleteItem(item);
  }

  protected getDbKey(): string {
    return AppointmentService.DB_KEY;
  }
}
