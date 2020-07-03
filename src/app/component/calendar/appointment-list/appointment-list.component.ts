import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Appointment} from '../../../class/appointment';
import {AppointmentService} from '../../../service/appointment.service';


@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListComponent implements OnInit {

  @Output() appointmentDeleted: EventEmitter<void> = new EventEmitter();
  @Input() appointments: Appointment[];

  constructor(
    private appointmentService: AppointmentService,
  ) { }


  ngOnInit(): void {
    this.appointments = this.appointments.sort((Appointment1, Appointment2) => {
      if (Appointment1.start > Appointment2.start) {
        return 1;
      }
      if (Appointment1.start < Appointment2.start) {
        return -1;
      }
      return 0;
    });
  }

  onAppointmentDeleted() {
    this.appointmentDeleted.emit();
  }
}
