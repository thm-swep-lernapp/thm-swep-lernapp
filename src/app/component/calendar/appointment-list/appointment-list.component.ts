import {Component, Input, OnInit} from '@angular/core';
import {Appointment} from '../../../class/appointment';
import {AppointmentService} from '../../../service/appointment.service';


@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListComponent implements OnInit {

  Appointments;
  constructor(
    private appointmentService: AppointmentService,
  ) { }


  ngOnInit(): void {
    this.Appointments = this.appointmentService.getItems;
  }

}
