import { Component } from '@angular/core';
import {ModuleService} from './service/module.service';
import * as moment from 'moment';
import {Logger} from './class/logger';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    Logger.init();
    Logger.warn('Welcome to StudiumsPlaner...');
    Logger.warn('These are our internals. Dread carefully!');
    Logger.log('Initializing Application...');

    moment.locale('de');
    moment.fn.toJSON = function() { return this.unix(); };
  }
}
