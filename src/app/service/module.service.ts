import {Injectable} from '@angular/core';
import {Module} from '../class/module';
import {DatabaseService} from './database.service';
import {HttpClient} from '@angular/common/http';
import {SettingsService} from './settings.service';
import {TestType} from '../class/test-type.enum';
import {BaseCrudService} from './base-crud-service';

@Injectable({
  providedIn: 'root'
})
export class ModuleService extends BaseCrudService<Module> {

  private static readonly MODULE_VERSION_KEY: string = 'module_version';
  private static readonly DB_KEY: string = 'modules';
  private static readonly MODULE_VERSION_URL: string = 'assets/module_version.json';
  private static readonly MODULES_URL: string = 'assets/modules.json';

  constructor(
    db: DatabaseService,
    private settings: SettingsService,
    private http: HttpClient
  ) {
    super(db, Module);

    this.http.get<ModuleVersion>(ModuleService.MODULE_VERSION_URL).subscribe(data => {
      const settingsVersion = this.settings.read(ModuleService.MODULE_VERSION_KEY, 0);
      if (data.version !== settingsVersion) {
        this.loadModules(data.version);
      }
    });
  }

  private syncModulesFromFile(fileModules: FileModule[], newVersion: number) {
    const updatedModules: Module[] = [];

    fileModules.forEach(fileModule => {
      const module = new Module();
      module.moduleId = fileModule.id;
      module.name = fileModule.name;
      module.plannedSemester = fileModule.semester;
      module.creditPoints = fileModule.creditPoints;

      module.description = '';
      for (let a = 0; a < fileModule.content.length; a++) {
        module.description += fileModule.content[a];
        if (a + 1 < fileModule.content.length) {
          module.description += '\n\n';
        }
      }

      module.testType = ModuleService.getTestTypeFromFileModuleTestKinds(fileModule.testKinds);

      updatedModules.push(module);
    });

    this.setItems(updatedModules);
    this.settings.save(ModuleService.MODULE_VERSION_KEY, newVersion);
  }

  private static getTestTypeFromFileModuleTestKinds(testKinds: Test[]): TestType {
    if (testKinds === null) { return null; }
    if (testKinds.length === 1) {
      const kind = testKinds[0];
      switch (kind.kind) {
        case 'exam':
          return TestType.TEST;
        case 'practice': case 'project': case 'special':
          return TestType.PROJECT;
        case 'paper': case 'paper and presentation': case 'bachelor thesis':
          return TestType.PAPER;
        case 'seminar':
          return TestType.OTHER;
        case 'oral exam':
          return TestType.ORAL_EXAM;
        default:
          return TestType.OTHER;
      }
    } else {
      return TestType.MIXED;
    }
  }

  private loadModules(newVersion: number) {
    this.http.get<FileModule[]>(ModuleService.MODULES_URL).subscribe(fileModules => {
      this.syncModulesFromFile(fileModules, newVersion);
    });
  }

  protected getDbKey(): string {
    return ModuleService.DB_KEY;
  }
}

export interface ModuleVersion {
  version: number;
}

export interface FileModule {
  id: string;
  semester: number;
  creditPoints: number;
  name: string;
  content: string[];
  testKinds: Test[];
}

export interface Test {
  percentage: number;
  kind: string;
}
