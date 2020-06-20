import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ModuleService} from '../../service/module.service';
import {Module} from '../../class/module';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatOption, MatOptionSelectionChange} from '@angular/material/core';

@Component({
  selector: 'app-module-picker',
  templateUrl: './module-picker.component.html',
  styleUrls: ['./module-picker.component.scss']
})
export class ModulePickerComponent implements OnInit {

  @Input() control: FormControl;
  @Input() excludeIds: string[];

  modules: Module[];
  filteredModules: Observable<Module[]>;

  constructor(
    private moduleService: ModuleService
  ) {
    this.modules = moduleService.getItems();
  }

  ngOnInit(): void {
    if (this.excludeIds) {
      this.modules = this.modules.filter(module => !this.excludeIds.includes(module.moduleId));
    }
    this.filteredModules = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this.filterModules(value))
    );
  }

  getOptionText(module: Module) {
    return module ? module.name : '';
  }

  private filterModules(value: any): Module[] {
    if (value instanceof Module) { return [value]; }
    if (!value) { return this.modules; }
    const lowercaseVal = value.toLowerCase();

    return this.modules.filter(module => module.name.toLowerCase().includes(lowercaseVal));
  }
}
