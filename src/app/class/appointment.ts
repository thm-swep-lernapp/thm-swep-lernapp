import {PersistableEntity} from './persistable-entity';
import {Module} from './module';
import { v4 as uuidv4 } from 'uuid';
import {Moment} from 'moment';
import * as moment from 'moment';

export class Appointment extends PersistableEntity {
  appointmentId: string = uuidv4();
  type: AppointmentType;
  name: string;
  description: string;
  place: string;
  start: Moment;
  end: Moment;
  allDay: boolean;
  interval: number;
  moduleId: string;

  getPrimaryId(): string {
    return this.appointmentId;
  }

  fromJSON(json: any) {
    super.fromJSON(json);
    this.start = moment.unix(json.start).utc();
    this.end = moment.unix(json.end).utc();
  }

  static getTypeStringFromType(type: AppointmentType) {
    switch (type) {
      case AppointmentType.TIMETABLE:
        return 'Stundenplan';
      case AppointmentType.LEARNING_PLAN:
        return 'Lernen';
      case AppointmentType.FREE_TIME:
        return 'Freizeit';
      case AppointmentType.EXAM:
        return 'Prüfung';
      default:
        return '';
    }
  }
}

export enum AppointmentType {
  TIMETABLE,
  LEARNING_PLAN,
  FREE_TIME,
  EXAM
}
