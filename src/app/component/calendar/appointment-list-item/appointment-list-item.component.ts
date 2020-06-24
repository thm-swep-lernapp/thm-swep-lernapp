import {Component, Input, OnInit} from '@angular/core';
import {AppointmentService} from '../../../service/appointment.service';
import {Router} from '@angular/router';
import {Appointment} from '../../../class/appointment';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListItemComponent implements OnInit {

  Appointment;
  constructor(
    private router: Router
  ) {

  }

  ngOnInit(): void {
  }

  getAppointmentName(): string {
    return this.Appointment.name;
  }
}
