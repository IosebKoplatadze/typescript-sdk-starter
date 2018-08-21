import { Payment } from '../models/payment';
import { Account } from '../models/account';
import { ComponentForm } from './component';
import { fromEvent } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  takeUntil,
  map
} from 'rxjs/operators';

export class PaymentDetails extends ComponentForm {
  private inputDOM: HTMLInputElement;
  private maxAmountErrorDOM: HTMLElement;
  private minAmountErrorDOM: HTMLElement;
  constructor(
    private payment: Payment,
    private accounts: Account[],
    private type: 'Deposit' | 'Withdraw'
  ) {
    super();
    this._DOM.classList.add('content_container');
    this._DOM.innerHTML = `
                <h2 class="modal__message text--danger is-hidden js-minAmountError">
                  Specified amount should not be less than
                  ${this.payment.min_amount} ${payment.currency}
                </h2>
                <h2 class="modal__message text--danger is-hidden js-maxAmountError">
                  Specified amount exceeds limit
                </h2>
                <div class="form__group">
                  <label class="form__label form__label--fixed text">Enter amount:</label>
                  <input type="text" name="depositSIS" class="form__control form__input amount text js-depositInput"
                  placeholder="Amount" autocomplete="off">
                    <span class="form__message form__message--hint text">
                      ${payment.currency}
                    </span>
                </div>`;
    this.inputDOM = this._DOM.querySelector('.js-depositInput');
    this.maxAmountErrorDOM = this._DOM.querySelector('.js-maxAmountError');
    this.minAmountErrorDOM = this._DOM.querySelector('.js-minAmountError');
    this.validations();
  }

  public get title(): string {
    return this.type;
  }

  private validations() {
    this.inputDOM.onkeypress = evt => {
      return (
        /(?<=^| )\d+(\.\d+)?(?=$| )/.test(this.inputDOM.value + evt.key) ||
        evt.keyCode === 46
      );
    };

    fromEvent(this.inputDOM, 'keyup')
      .pipe(
        takeUntil(this.$unsubscribe),
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(() => {
        if (
          parseFloat(this.inputDOM.value) > parseFloat(this.payment.max_amount)
        ) {
          this.maxAmountErrorDOM.classList.remove('is-hidden');
          this.minAmountErrorDOM.classList.add('is-hidden');
        } else if (parseFloat(this.inputDOM.value) < this.payment.min_amount) {
          this.minAmountErrorDOM.classList.remove('is-hidden');
          this.maxAmountErrorDOM.classList.add('is-hidden');
        } else {
          this.maxAmountErrorDOM.classList.add('is-hidden');
          this.minAmountErrorDOM.classList.add('is-hidden');
        }
      });
  }

  public onSubmit(): void {
    console.log(this.inputDOM.value);
  }
}
