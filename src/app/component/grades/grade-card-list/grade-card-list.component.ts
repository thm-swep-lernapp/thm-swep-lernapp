import {Component, Input, OnInit} from '@angular/core';
import {Grade} from '../../../class/grade';
import {GradesService} from '../../../service/grades.service';
import {GradeWrapper} from '../../../class/grade-wrapper';

@Component({
  selector: 'app-grade-card-list',
  templateUrl: './grade-card-list.component.html',
  styleUrls: ['./grade-card-list.component.scss']
})
export class GradeCardListComponent {
  @Input() grades: GradeWrapper[];
}
