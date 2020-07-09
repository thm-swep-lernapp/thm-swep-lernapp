import {environment} from '../../environments/environment';

export class Logger {
  static msgs = [];

  static init() {
    Logger.persist();
  }

  static log(message: string) {
    if (!environment.production) {
      console.log(message);
    }
    Logger.msgs.push(message);
    Logger.persist();
  }

  static warn(message: string) {
    if (!environment.production) {
      console.warn(message);
    }
    Logger.msgs.push(message);
    Logger.persist();
  }

  static error(message: string) {
    if (!environment.production) {
      console.error(message);
    }
    Logger.msgs.push(message);
    Logger.persist();
  }

  private static persist() {
    localStorage.setItem('swep_logs', JSON.stringify(Logger.msgs));
  }
}
