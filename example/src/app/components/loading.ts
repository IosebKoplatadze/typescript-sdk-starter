import { Component } from './component';

export class Loading extends Component {
  private static _loading: Loading;

  private constructor() {
    super();
    this._DOM.className = 'loading';
    this._DOM.innerHTML = `
                          <div class="loader" id="loader">
                            <span></span>
                            <span></span>
                            <span></span>
                          </div>`;
  }

  public static get instance(): Loading {
    return Loading._loading || (Loading._loading = new this());
  }

  public show(): void {
    this._DOM.classList.remove('hide');
  }

  public hide(): void {
    this._DOM.classList.add('hide');
  }
}
