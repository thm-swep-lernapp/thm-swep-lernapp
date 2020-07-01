import {Component, Input, OnInit} from '@angular/core';
import {AppointmentService} from '../../../service/appointment.service';
import {Router} from '@angular/router';
import {Appointment} from '../../../class/appointment';
import {Grade} from '../../../class/grade';

@Component({
  selector: 'app-appointment-list-item',
  templateUrl: './appointment-list-item.component.html',
  styleUrls: ['./appointment-list-item.component.scss']
})
export class AppointmentListItemComponent implements OnInit {

  @Input() public appoin: Appointment = new Appointment();
  constructor(
    private router: Router
  ) {

  }

  ngOnInit(): void {
  }

  getAppointmentName(): string {
    return this.appoin.name;
  }
  getAppointmentTime(): string {
    return this.appoin.start.toString()+' - '+this.appoin.end.toString()  ;
  }


  editAppointment(appointment: Appointment) {
    this.router.navigate(['/termine', appointment.appointmentId]);
  }
}
