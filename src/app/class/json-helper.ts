export class JsonHelper {
  static assignMatchingValuesFromJson(object: any, json: any) {
    // tslint:disable-next-line:forin
    for (const key in json) {
      // noinspection JSUnfilteredForInLoop
      object[key] = json[key];
    }
  }
}
