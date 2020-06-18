export class JsonHelper {
  static assignMatchingValuesFromJson(object: any, json: any) {
    for (let key in json) {
      if (key in object) {
        object[key] = json[key];
      }
    }
  }
}
