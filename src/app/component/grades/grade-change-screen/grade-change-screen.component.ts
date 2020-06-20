import { Component, OnInit } from '@angular/core';
import {AppbarService} from '../../../service/appbar.service';
import {GradesService} from '../../../service/grades.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Grade} from '../../../class/grade';
import {ModuleService} from '../../../service/module.service';
import {Module} from '../../../class/module';
import {FormControl, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {NavigationItem} from '../../../class/navigation-item';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-grade',
  templateUrl: './grade-change-screen.component.html',
  styleUrls: ['./grade-change-screen.component.scss']
})
export class GradeChangeScreenComponent implements OnInit {

  moduleControl = new FormControl(null, [Validators.required, this.isModule]);
  gradeControl = new FormControl(0);

  isCreation = false;
  grade: Grade;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private appbar: AppbarService,
    private modules: ModuleService,
    private grades: GradesService
  ) {
    route.paramMap.subscribe(params => {
      const id = params.get('gradeId');
      if (id === 'neu') {
        this.isCreation = true;
        this.grade = new Grade();
      } else {
        this.isCreation = false;
        this.grade = this.grades.getItemById(id);
        this.moduleControl.setValue(this.modules.getItemById(this.grade.moduleId));
        this.moduleControl.disable();
        this.gradeControl.setValue(this.grade.grade);
      }
    });
  }

  ngOnInit(): void {
    this.appbar.setTitle(this.isCreation ? 'Neue Leistung' : 'Leistung bearbeiten');
    this.appbar.setLeftNavigationItem(new NavigationItem(
      'Schließen',
      'close',
      () => {
        this.close();
      }
    ));
    if (!this.isCreation) {
      this.appbar.setRightNavigationItem(new NavigationItem(
        'Löschen',
        'delete',
        () => {
          this.grades.deleteItem(this.grade);
          this.close();
        }
      ));
    }
  }

  save() {
    if (this.isCreation && !this.moduleControl.valid) {
      this.snackbar.open('Bitte ein Modul angeben.', null, { duration: 2000 });
      return;
    }

    if (this.isCreation) {
      this.grade.moduleId = this.moduleControl.value.moduleId;
      this.grade.grade = this.gradeControl.value;
      this.grade.date = Date.now();
      this.grades.addItem(this.grade);
    } else {
      this.grade.grade = this.gradeControl.value;
      this.grades.updateItem(this.grade);
    }

    this.close();
  }

  getModuleIdsOfUsedGrades() {
    return this.grades.getItems().map(grade => grade.moduleId);
  }

  getChosenModule(): Module {
    return this.moduleControl.value as Module;
  }

  isModuleReady() {
    return this.moduleControl.value && this.moduleControl.value instanceof Module;
  }

  isModule(control: FormControl): ValidationErrors {
    return control.value instanceof Module ? null : { isModule: false };
  }

  private close() {
    this.router.navigate(['/leistungen'], { replaceUrl: true });
  }
}
