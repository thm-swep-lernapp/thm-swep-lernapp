import {Injectable} from '@angular/core';
import {Module} from '../class/module';
import {DatabaseService} from './database.service';
import {HttpClient} from '@angular/common/http';
import {SettingsService} from './settings.service';
import {TestType} from '../class/test-type.enum';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  public modules: Module[];

  private readonly MODULE_VERSION_KEY: string = "module_version";
  private readonly DB_KEY: string = "modules";
  private readonly MODULE_VERSION_URL: string = "assets/module_version.json";
  private readonly MODULES_URL: string = "assets/modules.json";

  constructor(
    private db: DatabaseService,
    private settings: SettingsService,
    private http: HttpClient
  ) {
    this.modules = db.read(this.DB_KEY, Module);

    this.http.get<ModuleVersion>(this.MODULE_VERSION_URL).subscribe(data => {
      let settingsVersion = this.settings.read(this.MODULE_VERSION_KEY, 0);
      if (data.version !== settingsVersion) {
        this.loadModules();
      }
    })
  }

  getModuleById(moduleId: string) {
    return this.modules.find(module => module.moduleId === moduleId);
  }

  private syncModulesFromFile(fileModules: FileModule[]) {
    let updatedModules: Module[] = [];

    fileModules.forEach(fileModule => {
      let module = new Module();
      module.moduleId = fileModule.id;
      module.name = fileModule.name;
      module.plannedSemester = fileModule.semester;
      module.creditPoints = fileModule.creditPoints;

      module.description = "";
      for (let a = 0; a < fileModule.content.length; a++) {
        module.description += fileModule.content[a];
        if (a + 1 < fileModule.content.length) {
          module.description += "\n\n";
        }
      }

      module.testType = ModuleService.getTestTypeFromFileModuleTestKinds(fileModule.testKinds);

      updatedModules.push(module);
    });

    this.db.sync(this.DB_KEY, updatedModules);
    this.modules = updatedModules;
  }

  private static getTestTypeFromFileModuleTestKinds(testKinds: Test[]): TestType {
    if (testKinds === null) { return null; }
    if (testKinds.length === 1) {
      let kind = testKinds[0];
      switch (kind.kind) {
        case "exam":
          return TestType.TEST;
        case "practice": case "project": case "special":
          return TestType.PROJECT;
        case "paper": case "paper and presentation": case "bachelor thesis":
          return TestType.PAPER;
        case "seminar":
          return TestType.OTHER;
        case "oral exam":
          return TestType.ORAL_EXAM;
        default:
          return TestType.OTHER;
      }
    } else {
      return TestType.MIXED;
    }
  }

  private loadModules() {
    this.http.get<FileModule[]>(this.MODULES_URL).subscribe(fileModules => {
      this.syncModulesFromFile(fileModules);
    })
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
