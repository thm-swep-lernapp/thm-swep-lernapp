import {PersistableEntity} from './persistable-entity';
import {Module} from './module';
import { v4 as uuidv4 } from 'uuid';

export class Appointment extends PersistableEntity {
  appointmentId: string = uuidv4();
  type: AppointmentType;
  name: string;
  description: string;
  place: string;
  start: number;
  end: number;
  allDay: boolean;
  interval: number;
  moduleId: string;

  getPrimaryId(): string {
    return this.appointmentId;
  }
}

export enum AppointmentType {
  TIMETABLE,
  LEARNING_PLAN,
  FREE_TIME,
  EXAM
}
