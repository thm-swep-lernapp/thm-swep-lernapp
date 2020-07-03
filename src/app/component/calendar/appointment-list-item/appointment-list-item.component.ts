import {Component, Input, OnInit} from '@angular/core';
import {AppointmentService} from '../../../service/appointment.service';
import {Router} from '@angular/router';
import {Appointment} from '../../../class/appointment';

enum AppointmentType {
  TIMETABLE,
  LEARNING_PLAN,
  FREE_TIME,
  EXAM
}

@Component({
  selector: 'app-appointment-list-item',
  templateUrl: './appointment-list-item.component.html',
  styleUrls: ['./appointment-list-item.component.scss']
})
export class AppointmentListItemComponent implements OnInit {

  @Input() public appoin: Appointment = new Appointment();

  constructor(
    private router: Router,
    private appointments: AppointmentService
  ) {

  }

  ngOnInit(): void {
  }

  getAppointmentTypeStringFromType(type: Appointment['type']) {
    console.log('test');
    switch (type) {
      case AppointmentType.TIMETABLE:
        return 'Stundenplan - ';
      case AppointmentType.LEARNING_PLAN:
        return 'Lernen - ';
      case AppointmentType.FREE_TIME:
        return 'Freizeit - ';
      case AppointmentType.EXAM:
        return 'Prüfung - ';
      default:
        return '';
    }
  }

  getAppointmentName(): string {
    const Anhang = this.getAppointmentTypeStringFromType(this.appoin.type);
    return  Anhang + this.appoin.name;
  }
  getAppointmentTime(): string {
    return this.appoin.start.toString() + ' - ' + this.appoin.end.toString()  ;
  }


  editAppointment(appointment: Appointment) {
    this.router.navigate(['/termine', appointment.appointmentId]);
  }
  deleteAppointment(appointment: Appointment) {
    this.appointments.deleteItem(appointment);
  }
}
