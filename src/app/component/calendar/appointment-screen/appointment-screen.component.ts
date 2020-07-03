import {Component, Input, NgModule, OnInit} from '@angular/core';
import {FormBuilder, FormControl, ValidationErrors, Validators, AbstractControl} from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import {NavigationItem} from '../../../class/navigation-item';
import {ModuleService} from '../../../service/module.service';
import {Module} from '../../../class/module';
import {Appointment, AppointmentType} from '../../../class/appointment';
import {AppointmentService} from '../../../service/appointment.service';
import {AppbarService} from '../../../service/appbar.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {min} from 'rxjs/operators';
import {error} from 'selenium-webdriver';

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
  appointmentTypes = [AppointmentType.TIMETABLE, AppointmentType.EXAM, AppointmentType.LEARNING_PLAN, AppointmentType.FREE_TIME];
  ApType: AppointmentType;




  isCreation = false;
  appointmentForm = this.formBuilder.group({
    Titel: new FormControl(''),
    Datum: new FormControl(''),
    Intervall: new FormControl(''),
    Beschreibung: new FormControl(''),
    Ort: new FormControl(''),
    Terminart: new FormControl(''),
    Enum: new FormControl(''),
    StartZeit: new FormControl(''),
    EndZeit: new FormControl({value: '', disabled: true})
  });

  constructor(
    private appbar: AppbarService,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private router: Router,
    private modules: ModuleService,
    private appointments: AppointmentService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar

  ) {
    route.paramMap.subscribe(params => {
      const id = params.get('appointmentId');
      if (id === 'neu') {
        this.isCreation = true;
        this.appointment = new Appointment();
      } else {
        this.isCreation = false;
        this.appointment = this.appointments.getItemById(id);
        this.appointmentForm.get('EndZeit').enable();
        console.log(this.appointment);
        this.moduleControl.setValue(this.modules.getItemById(this.appointment.moduleId));
        this.appointmentForm.patchValue({
          Titel: this.appointment.name,
          Intervall: this.appointment.interval ? this.appointment.interval.toString() : null,
          Beschreibung: this.appointment.description,
          Ort: this.appointment.place,
          Enum: this.appointment.type ? this.appointment.type.toString() : -1,
          StartZeit: this.appointment.start,
          EndZeit: this.appointment.end});
      }
    });

    this.disableIntervalIfMultiDay(this.appointmentForm.value.StartZeit, this.appointmentForm.value.EndZeit);

    this.appointmentForm.get('StartZeit').valueChanges.subscribe(selectedValue => {
      this.appointmentForm.get('EndZeit').enable();
      this.disableIntervalIfMultiDay(selectedValue, this.appointmentForm.value.EndZeit);
    });

    this.appointmentForm.get('EndZeit').valueChanges.subscribe(selectedValue => {
      this.disableIntervalIfMultiDay(this.appointmentForm.value.StartZeit, selectedValue);
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

  disableIntervalIfMultiDay(start, end) {
    if (start && end && !start.isSame(end, 'day')) {
      this.appointmentForm.patchValue({Intervall : null});
      this.appointmentForm.get('Intervall').disable();
    } else {
      this.appointmentForm.get('Intervall').enable();
    }
  }

  getAppointmentTypeStringFromType(type: AppointmentType) {
    return Appointment.getTypeStringFromType(type);
  }

  getAppointmentColorFromType(type: AppointmentType) {
    return Appointment.getTypeColorFromType(type);
  }

  parseValue(value: string){
    this.ApType = AppointmentType[value];
    console.log(this.ApType);
  }

  onSubmit(){
    if (this.isCreation && !this.moduleControl.valid) {
      this.snackbar.open('Bitte ein Modul angeben.', null, {duration: 2000});
      return true;
    }
    if (this.appointmentForm.get('EndZeit').value <=  this.appointmentForm.get('StartZeit').value){
      this.appointmentForm.patchValue({EndZeit : null});
      this.snackBar.open('Bitte gebe eine gültige Endzeit ein', '', {
        duration: 4000,
      });
      return true;
    }
    return false;
  }

  save() {


    if (this.onSubmit()){
      return;
    }

    this.appointment.moduleId = this.moduleControl.value.moduleId;
    this.appointment.name = this.appointmentForm.value.Titel;
    this.appointment.description = this.appointmentForm.value.Beschreibung;
    this.appointment.place = this.appointmentForm.value.Ort;
    this.appointment.type = this.appointmentForm.value.Enum;
    const type = this.appointmentForm.value.Enum;
    if (type && type.length > 0) {
      this.appointment.type = parseInt(type, 10);
    }
    this.appointment.start = this.appointmentForm.value.StartZeit.utc();
    this.appointment.end = this.appointmentForm.value.EndZeit.utc();
    const interval = this.appointmentForm.value.Intervall;
    if (interval && interval.length > 0) {
      this.appointment.interval = parseInt(interval, 10);
    }

    if (this.isCreation) {
      this.appointments.addItem(this.appointment);
    } else {
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

