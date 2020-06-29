import {Component, Input, NgModule, OnInit} from '@angular/core';
import {FormBuilder, FormControl, ValidationErrors, Validators} from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import {NavigationItem} from '../../../class/navigation-item';
import {ModuleService} from '../../../service/module.service';
import {Module} from '../../../class/module';
import {Appointment} from '../../../class/appointment';
import {AppointmentService} from '../../../service/appointment.service';
import {AppbarService} from '../../../service/appbar.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

@NgModule({
  imports: [NgxMaterialTimepickerModule]
})
export class MyModule {}

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment-screen.component.html',
  styleUrls: ['./appointment-screen.component.scss']
})

export class AppointmentScreenComponent implements OnInit {

  moduleControl = new FormControl(null, [Validators.required, this.isModule]);

  appointment: Appointment;

  isCreation = false;
  appointmentForm = this.formBuilder.group({
    Titel: new FormControl(''),
    Datum: new FormControl(''),
    Intervall: new FormControl(''),
    Beschreibung: new FormControl(''),
    Ort: new FormControl(''),
    Terminart: new FormControl(''),
    StartZeit: new FormControl('')
  });

  constructor(
    private appbar: AppbarService,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private router: Router,
    private modules: ModuleService,
    private appointments: AppointmentService,
    private formBuilder: FormBuilder,
  ) {
    route.paramMap.subscribe(params => {
      const id = params.get('appointmentId');
      if (id === 'neu') {
        this.isCreation = true;
        this.appointment = new Appointment();
      } else {
        this.isCreation = false;
        this.appointment = this.appointments.getItemById(id);
        console.log(this.appointment);
        this.moduleControl.setValue(this.modules.getItemById(this.appointment.moduleId));
        this.appointmentForm.patchValue({Titel: this.appointment.name,
          Datum: this.appointment.date,
          Intervall: this.appointment.interval,
          Beschreibung: this.appointment.description,
          Ort: this.appointment.place,
          Terminart: this.appointment.type,
          StartZeit: this.appointment.start});
        console.log(this.appointmentForm.value.Titel);
      }
    });

  }


  ngOnInit(): void {
    this.appbar.setTitle(this.isCreation ? 'Neuer Termin' : 'Termin bearbeiten');
    this.appbar.setLeftNavigationItem(new NavigationItem(
      'Schließen',
      'close',
      () => {
        this.close();
      }
    ));
  }

  onSubmit(appointmentForm){
    console.warn(appointmentForm);
  }

  save() {
    this.onSubmit(this.appointmentForm);
    if (this.isCreation && !this.moduleControl.valid) {
      this.snackbar.open('Bitte ein Modul angeben.', null, {duration: 2000});
      return;
    }

    if (this.isCreation) {
      this.appointment.moduleId = this.moduleControl.value.moduleId;
      this.appointment.name = this.appointmentForm.value.Titel;
      this.appointment.date = this.appointmentForm.value.Datum;
      this.appointment.description = this.appointmentForm.value.Beschreibung;
      this.appointment.place = this.appointmentForm.value.Ort;
      this.appointment.start = this.appointmentForm.value.StartZeit;
      console.warn(this.appointment);
      this.appointments.addItem(this.appointment);
    }else {
      this.appointment.moduleId = this.moduleControl.value.moduleId;
      this.appointment.name = this.appointmentForm.value.Titel;
      this.appointment.date = this.appointmentForm.value.Datum;
      this.appointment.description = this.appointmentForm.value.Beschreibung;
      this.appointment.place = this.appointmentForm.value.Ort;
      this.appointment.start = this.appointmentForm.value.StartZeit;
      this.appointments.updateItem(this.appointment);
    }

    this.close();
  }

  isModule(control: FormControl): ValidationErrors {
    return control.value instanceof Module ? null : { isModule: false };
  }
  getChosenModule(): Module {
    return this.moduleControl.value as Module;
  }

  isModuleReady() {
    return this.moduleControl.value && this.moduleControl.value instanceof Module;
  }
  private close() {
    console.warn(this.appointment);
    this.router.navigate(['/termine'], { replaceUrl: true });
  }
}

