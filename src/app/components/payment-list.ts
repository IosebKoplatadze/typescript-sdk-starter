import { Payment } from '../models/payment';
import { PaymentListItem } from './payment-list-item';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Core } from '../core';
import { Component } from './component';

export class PaymentList extends Component {
  public instructionToggler$: Subject<number> = new Subject();

  private paymentListItems: { [id: number]: PaymentListItem } = {};

  private activeInstructionPaymentId: number;

  constructor(private payments: Payment[]) {
    super();
    this._DOM.classList.add('payment-list');
    [].forEach.call(this.payments, (payment: Payment) => {
      let paymentListItem = new PaymentListItem(
        payment,
        this.instructionToggler$
      );
      this._DOM.appendChild(paymentListItem.DOM);
      this.paymentListItems[payment.id] = paymentListItem;
    });

    this.instructionToggler$
      .pipe(takeUntil(this.$unsubscribe))
      .subscribe(id => {
        if (
          this.activeInstructionPaymentId &&
          this.activeInstructionPaymentId !== id
        ) {
          this.paymentListItems[
            this.activeInstructionPaymentId
          ].toggleInstruction();
        }
        this.activeInstructionPaymentId = this.paymentListItems[
          id
        ].toggleInstruction();
      });
  }

  public destroy() {
    for (var key in this.paymentListItems) {
      if (this.paymentListItems.hasOwnProperty(key)) {
        this.paymentListItems[key].destroy();
      }
    }
    super.destroy();
  }
}
