import { Component, OnInit } from '@angular/core';
import {AppbarService} from '../../../service/appbar.service';
import {AppointmentService} from '../../../service/appointment.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar-screen.component.html',
  styleUrls: ['./calendar-screen.component.scss']
})
export class CalendarScreenComponent implements OnInit {

  constructor(
    private appbar: AppbarService,
    private appointmentService: AppointmentService,
  ) { }

  ngOnInit(): void {
    this.appbar.setTitle('Kalendar');

    const appointmentsFromDb = this.appointmentService.getItems();

  }

}
