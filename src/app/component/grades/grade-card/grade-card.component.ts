import {Component, Input, OnInit} from '@angular/core';
import {Grade} from '../../../class/grade';
import {ModuleService} from '../../../service/module.service';
import {GradeWrapper} from '../../../class/grade-wrapper';
import {TestType} from '../../../class/test-type.enum';
import {Router} from '@angular/router';

@Component({
  selector: 'app-grade-card',
  templateUrl: './grade-card.component.html',
  styleUrls: ['./grade-card.component.scss']
})
export class GradeCardComponent implements OnInit {

  @Input() gradeWithModule: GradeWrapper = new GradeWrapper();

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {}

  getModuleName(): string {
    return this.gradeWithModule.module ? this.gradeWithModule.module.name : 'Kein Modul';
  }

  getModuleCreditPoints(): string {
    return this.gradeWithModule.module ? (this.gradeWithModule.grade.grade >= 50 ? this.gradeWithModule.module.creditPoints : 0) + 'CP' : '?CP';
  }

  getReadableTestType(): string {
    return this.gradeWithModule.module ? this.gradeWithModule.module.getReadableTestType() : 'Unbekannt';
  }

  editGrade(grade: Grade) {
    this.router.navigate(['/leistungen', grade.moduleId]);
  }
}
