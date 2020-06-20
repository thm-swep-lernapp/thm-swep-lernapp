import {PersistableEntity} from './persistable-entity';
import { uuid } from 'uuid';
import {Appointment} from './appointment';

export class Reminder extends PersistableEntity {
  reminderId: string = uuid.v4();
  appointmentId: string;
  date: number;

  static fromAppointment(appointment: Appointment, dueOffset: number) {
    const reminder = new Reminder();
    reminder.appointmentId = appointment.appointmentId;
    reminder.date = appointment.start - dueOffset;
    return reminder;
  }

  getPrimaryId(): string {
    return this.reminderId;
  }
}
