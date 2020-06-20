export class NavigationItem {
  text: string;
  icon: string;
  clickHandler: () => void;


  constructor(text: string, icon: string, clickHandler: () => void) {
    this.text = text;
    this.icon = icon;
    this.clickHandler = clickHandler;
  }
}
