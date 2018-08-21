import { Subject } from 'rxjs';

export abstract class Component {
  protected _DOM: HTMLElement;
  protected $unsubscribe: Subject<void> = new Subject();

  constructor(tagName: string = 'div') {
    this._DOM = document.createElement(tagName);
  }

  public get DOM(): HTMLElement {
    return this._DOM;
  }

  public destroy(): void {
    this._DOM.remove();
    this.$unsubscribe.next();
  }
}

export abstract class ComponentForm extends Component {
  public abstract onSubmit(): void;
  public abstract get title(): string;

  public destroy(): void {
    super.destroy();
    this.$unsubscribe.complete();
  }
}
