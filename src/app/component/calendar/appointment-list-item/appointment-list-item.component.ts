import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppointmentService} from '../../../service/appointment.service';
import {Router} from '@angular/router';
import {Appointment, AppointmentType} from '../../../class/appointment';
import {Moment} from 'moment';
import {ModuleService} from '../../../service/module.service';

@Component({
  selector: 'app-appointment-list-item',
  templateUrl: './appointment-list-item.component.html',
  styleUrls: ['./appointment-list-item.component.scss']
})
export class AppointmentListItemComponent implements OnInit {

  @Output() appointmentDeleted: EventEmitter<void> = new EventEmitter();
  @Input() public appoin: Appointment = new Appointment();

  constructor(
    private router: Router,
    private appointments: AppointmentService,
    private modules: ModuleService,
  ) {

  }

  ngOnInit(): void {
  }

  getAppointmentTypeStringFromType(type: AppointmentType) {
    return Appointment.getTypeStringFromType(type);
  }

  getAppointmentName(): string {
    const anhang = this.appoin.type ? this.getAppointmentTypeStringFromType(this.appoin.type) + ': ' : '';
    return  anhang + this.appoin.name;
  }

  getAppointmentTime(): string {
    return this.appoin.start.format('HH:mm') + ' - ' + this.appoin.end.format('HH:mm');
  }

  getModuleName(id: string): string {
    return this.modules.getItemById(id).name;
  }

  editAppointment(appointment: Appointment) {
    this.router.navigate(['/termine', appointment.appointmentId]);
  }

  deleteAppointment(appointment: Appointment) {
    this.appointments.deleteItem(appointment);
    this.appointmentDeleted.emit();
  }
}
