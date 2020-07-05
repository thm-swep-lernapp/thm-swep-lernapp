import {PersistableEntity} from './persistable-entity';
import { v4 as uuidv4 } from 'uuid';
import {Appointment} from './appointment';

export class Reminder extends PersistableEntity {
  reminderId: string = uuidv4();
  appointmentId: string;
  date: number;

  static fromAppointment(appointment: Appointment, dueOffset: number) {
    const reminder = new Reminder();
    reminder.appointmentId = appointment.appointmentId;
    reminder.date = appointment.start.unix() - dueOffset;
    return reminder;
  }

  getPrimaryId(): string {
    return this.reminderId;
  }
}
