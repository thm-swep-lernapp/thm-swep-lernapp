import { Component, OnInit } from '@angular/core';
import {AppbarService} from '../../../service/appbar.service';

@Component({
  selector: 'app-grades',
  templateUrl: './grades-screen.component.html',
  styleUrls: ['./grades-screen.component.scss']
})
export class GradesScreenComponent implements OnInit {

  constructor(
    private appbar: AppbarService
  ) { }

  ngOnInit(): void {
    this.appbar.setTitle('Leistungen');
  }

}
