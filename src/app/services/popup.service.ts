import { Component, ComponentForm } from '../components/component';
import { fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export class PopupService<T extends ComponentForm> extends Component {
  private static _popupService: PopupService<any>;
  private component: T;
  private contentDOM: HTMLElement;
  private titleDOM: HTMLElement;
  private closeBtn: HTMLButtonElement;
  private OKBtn: HTMLButtonElement;

  private constructor() {
    super();
    this._DOM.classList.add('modal_container');
    this._DOM.innerHTML = `<div class="modal is-infinite" id="depositOperaPay">
                            <div class="modal__header">
                                <h2 class="modal__title text--uppercase js-title"></h2>
                                <a href="#" class="modal__close js-closeBtn"></a>
                            </div>
                            <div class="modal__step" id="depositSISStep1">
                                <div class="modal__content js-content">
                                </div>
                                <div class="modal__footer">
                                    <button class="btn-footer js-OKBtn">Continue</button>
                                </div>
                            </div>
                          </div>`;

    this.contentDOM = this._DOM.querySelector('.js-content');
    this.titleDOM = this._DOM.querySelector('.js-title');
    this.OKBtn = this._DOM.querySelector('.js-OKBtn');
    this.closeBtn = this._DOM.querySelector('.js-closeBtn');
  }

  public static get instance(): PopupService<any> {
    return (
      PopupService._popupService || (PopupService._popupService = new this())
    );
  }

  public open(c: new (...params: any[]) => T, ...params: any[]): void {
    this.close();
    this.overlayToggle(true);
    this.component = new c(...params);
    this.contentDOM.appendChild(this.component.DOM);
    console.log(this.component);
    this.titleDOM.innerText = this.component.title;
    this.eventlisteners();
  }

  public close(): void {
    this.component ? this.component.destroy() : (this.component = null);
    this.contentDOM.innerHTML = '';
    this.titleDOM.innerText = '';
    this.destroy();
  }

  private overlayToggle(visible: boolean) {
    const body = document.getElementsByTagName('body')[0];
    if (visible) {
      body.insertAdjacentHTML(
        'afterbegin',
        '<div id="Overlay" class="overlay"></div>'
      );
    } else {
      const overlay = document.getElementById('Overlay');
      if (overlay) body.removeChild(overlay);
    }
  }

  private eventlisteners(): void {
    fromEvent(this.closeBtn, 'click')
      .pipe(takeUntil(this.$unsubscribe))
      .subscribe(() => {
        this.close();
      });

    fromEvent(this.OKBtn, 'click')
      .pipe(takeUntil(this.$unsubscribe))
      .subscribe(() => {
        console.log('OK!');
        this.component.onSubmit();
      });
  }

  public destroy() {
    this.overlayToggle(false);
    super.destroy();
  }
}
