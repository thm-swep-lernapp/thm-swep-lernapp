import {DatabaseService} from './database.service';
import {PersistableEntity} from '../class/persistable-entity';
import {Grade} from '../class/grade';

export abstract class BaseCrudService<T extends PersistableEntity> {

  items: T[];

  db: DatabaseService;

  protected constructor(
    db: DatabaseService,
    creator: (new () => T)
  ) {
    this.db = db;
    this.items = this.db.read(this.getDbKey(), creator);
  }

  getItems(): T[] {
    return this.items;
  }

  getItemById(id: string): T {
    return this.items.find(item => item.getPrimaryId() === id);
  }

  addItem(item: T) {
    this.items.push(item);
    this.db.sync(this.getDbKey(), this.items);
  }

  updateItem(item: T): boolean {
    const index = this.items.findIndex(foundItem => item.getPrimaryId() === foundItem.getPrimaryId());
    if (index === -1) { return false; }
    this.items[index] = item;
    this.db.sync(this.getDbKey(), this.items);
    return true;
  }

  deleteItem(item: T): boolean {
    const index = this.items.findIndex(foundItem => item.getPrimaryId() === foundItem.getPrimaryId());
    if (index === -1) { return false; }
    this.items.splice(index, 1);
    this.db.sync(this.getDbKey(), this.items);
    return true;
  }

  protected setItems(items: T[]) {
    this.items = items;
    this.db.sync(this.getDbKey(), this.items);
  }

  protected abstract getDbKey(): string;
}
