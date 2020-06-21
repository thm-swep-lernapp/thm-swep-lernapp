import { Injectable } from '@angular/core';
import {Grade} from '../class/grade';
import {DatabaseService} from './database.service';
import {BaseCrudService} from './base-crud-service';

@Injectable({
  providedIn: 'root'
})
export class GradesService extends BaseCrudService<Grade> {

  private static readonly DB_KEY = 'grades';

  constructor(
    db: DatabaseService
  ) {
    super(db, Grade);
  }

  protected getDbKey(): string {
    return GradesService.DB_KEY;
  }
}
