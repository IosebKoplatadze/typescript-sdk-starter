import { Payment } from '../models/payment';
import { RouterService } from '../services/router.service';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Config } from '../config';
import { Core } from '../core';
import { Component } from './component';

export class PaymentListItem extends Component {
  private isInstruqctionActive: boolean = false;

  constructor(
    private payment: Payment,
    private $instructionToggler: Subject<number>
  ) {
    super();
    this._DOM.classList.add('payment-list__item');
    this._DOM.innerHTML = `<div class="grid__row">
                            <div class="grid__col">
                              <img src="${Core.instance.staticUrl +
                                payment.logo}" alt="${payment.name}">
                            </div>
                            <div class="grid__col">
                              ${payment.min_amount} ${payment.currency}
                            </div>
                            <div class="grid__col">
                              ${payment.max_amount} ${payment.currency}
                            </div>
                            <div class="grid__col">
                              <button type="button" class="btn-instruction js-instructionBtn">
                                <span class="text">
                                  ${Core.instance.locale.Buttons.Instructions}
                                  <i class="icon-triangle-arrow"></i>
                                </span>
                              </button>
                            </div>
                            <div class="grid__col">
                              <button href="#" class="btn-success js-detailsBtn" disabled>${
                                Core.instance.locale.Buttons.Deposit
                              }</button>
                            </div>
                          </div>`;

    fromEvent(this._DOM.querySelector('.js-instructionBtn'), 'click')
      .pipe(takeUntil(this.$unsubscribe))
      .subscribe(() => {
        this.onClickInstruction();
      });

    const detailsBtn: HTMLButtonElement = this._DOM.querySelector(
      '.js-detailsBtn'
    );
    fromEvent(detailsBtn, 'click')
      .pipe(takeUntil(this.$unsubscribe))
      .subscribe(() => {
        this.onDetails();
      });
    if (this.payment.type === Config.allowedDetailsType)
      detailsBtn.disabled = false;
  }

  private onClickInstruction() {
    this.$instructionToggler.next(this.payment.id);
  }

  public toggleInstruction(): number {
    this.isInstruqctionActive = !this.isInstruqctionActive;
    if (this.isInstruqctionActive) {
      this._DOM.insertAdjacentHTML(
        'beforeend',
        `<div  class="instruction-content js-instruction">
          <div>
            ${this.payment.instruction}
          </div>
        </div>`
      );
      return this.payment.id;
    } else {
      this._DOM.removeChild(this._DOM.querySelector('.js-instruction'));
      return null;
    }
  }

  private onDetails(): void {
    RouterService.instance.onPaymentDetails(this.payment);
  }
}
