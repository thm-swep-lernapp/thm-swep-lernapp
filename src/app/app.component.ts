import { Component } from '@angular/core';
import {ModuleService} from './service/module.service';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    moment.locale('de');
    moment.fn.toJSON = function() { return this.unix(); };
  }
}
