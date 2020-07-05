import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulePickerComponent } from './module-picker.component';

describe('ModulePickerComponent', () => {
  let component: ModulePickerComponent;
  let fixture: ComponentFixture<ModulePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModulePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModulePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
