import {PersistableEntity} from './persistable-entity';
import {Module} from './module';
import { uuid } from 'uuid';

export class Appointment extends PersistableEntity {
  appointmentId: string = uuid.v4();
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
