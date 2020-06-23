import {Component, Input, OnInit} from '@angular/core';
import {Appointment} from '../../../class/appointment';


@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListComponent implements OnInit {

  @Input() Appointment: Appointment[];
  constructor() { }

  ngOnInit(): void {
  }

}
