import { Injectable } from '@angular/core';
import {Reminder} from '../class/reminder';
import {DatabaseService} from './database.service';
import {SettingsService} from './settings.service';
import {Appointment} from '../class/appointment';

@Injectable({

  providedIn: 'root'
})
export class ReminderService {

  reminders: Reminder[];
  private dueOffset: number;

  private static readonly DB_KEY = 'reminders';
  private static readonly DUE_OFFSET_KEY = 'due_offset';

  constructor(
    private db: DatabaseService,
    private settings: SettingsService
  ) {
    this.reminders = this.db.read(ReminderService.DB_KEY, Reminder);
    this.dueOffset = this.settings.read(ReminderService.DUE_OFFSET_KEY, 3600000);
  }

  addReminderForAppointment(appointment: Appointment) {
    const newReminder = Reminder.fromAppointment(appointment, this.dueOffset);
    this.reminders.push(newReminder);
    this.db.sync(ReminderService.DB_KEY, this.reminders);
  }

  updateReminderForAppointment(appointment: Appointment) {
    for (let a = 0; a < this.reminders.length; a++) {
      if (this.reminders[a].appointmentId === appointment.appointmentId) {
        this.reminders[a] = Reminder.fromAppointment(appointment, this.dueOffset);
        this.db.sync(ReminderService.DB_KEY, this.reminders);
        return;
      }
    }
  }

  deleteReminderForAppointment(appointment: Appointment) {
    for (let a = 0; a < this.reminders.length; a++) {
      if (this.reminders[a].appointmentId === appointment.appointmentId) {
        this.reminders.splice(a, 1);
        break;
      }
    }

    this.db.sync(ReminderService.DB_KEY, this.reminders);
  }

  getDueReminders(): Reminder[] {
    const dueReminders = [];
    const now = Date.now();
    for (const reminder of this.reminders) {
      if (reminder.date <= now) {
        dueReminders.push(reminder);
      }
    }
    return dueReminders;
  }

  setDueOffset(offsetInMs: number) {
    this.settings.save(ReminderService.DUE_OFFSET_KEY, offsetInMs);
    this.dueOffset = offsetInMs;
  }
}
