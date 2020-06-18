import { Injectable } from '@angular/core';
import {Appointment} from '../class/appointment';
import {DatabaseService} from './database.service';
import {ReminderService} from './reminder.service';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  appointments: Appointment[];

  private readonly DB_KEY = "appointments";

  constructor(
    private db: DatabaseService,
    private reminders: ReminderService
  ) {
    this.appointments = this.db.read(this.DB_KEY, Appointment);
  }

  createAppointment(appointment: Appointment, createReminder: boolean) {
    this.appointments.push(appointment);
    if (createReminder) {
      this.reminders.addReminderForAppointment(appointment);
    }

    this.db.sync(this.DB_KEY, this.appointments);
  }

  updateAppointment(appointment: Appointment) {
    let index = this.appointments.findIndex(foundAppointment => foundAppointment.appointmentId === appointment.appointmentId);
    if (index === -1) { return; }
    this.appointments[index] = appointment;
    this.reminders.updateReminderForAppointment(appointment);
  }

  deleteAppointment(appointment: Appointment) {
    let index = this.appointments.findIndex(foundAppointment => foundAppointment.appointmentId === appointment.appointmentId);
    if (index === -1) { return; }
    this.appointments.splice(index, 1);
    this.reminders.removeReminderForAppointment(appointment);
  }
}
