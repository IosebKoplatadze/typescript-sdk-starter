import { PaymentsService } from './services/payments.service';
import { Config } from './config';
import { PaymentList } from './components/payment-list';
import { PaymentDetails } from './components/payment-details';
import { Payment } from './models/payment';
import { RouterService } from './services/router.service';
import { PopupService } from './services/popup.service';
import { Loading } from './components/loading';
import { Subject } from 'rxjs';
import { EN, KA } from './locales/index';

export class Core {
  private static _core: Core;
  private root: HTMLElement;
  private paymentList: PaymentList;
  private lang: string;
  private type: 'Deposit' | 'Withdraw';
  private userId: number;
  private providerId: string;
  private _staticUrl: string;
  private _locale: any;

  private constructor() {}

  public static get instance(): Core {
    return Core._core || (Core._core = new this());
  }

  public init(
    lang: string,
    type: 'Deposit' | 'Withdraw',
    userId: number,
    providerId: string
  ) {
    this.lang = lang;
    this.type = type;
    this.userId = userId;
    this.providerId = providerId;
    this.defineLocale();
    const sngPayments = document.getElementById(Config.sngPaymentsId);
    this.clearRoot();
    sngPayments.innerHTML = '';
    this.root = document.createElement('div');
    this.root.classList.add('payment-list-container');
    sngPayments.appendChild(this.root);
    sngPayments.appendChild(Loading.instance.DOM);
    this.drawPaymentsList();
    this.routerListener();
  }

  private defineLocale(): void {
    switch (this.lang) {
      case 'ka':
        this._locale = KA;
        break;
      default:
        this._locale = EN;
    }
  }

  private drawPaymentsList(): void {
    Loading.instance.show();
    PaymentsService.instance
      .getPaymentsList(this.lang, this.type)
      .subscribe(res => {
        Loading.instance.hide();
        this._staticUrl = res.data.static_url;
        // this.clearRoot();
        this.paymentList = new PaymentList(res.data.payments);
        this.root.appendChild(this.paymentList.DOM);
      });
  }

  private drawPaymentDetails(payment: Payment): void {
    Loading.instance.show();
    PaymentsService.instance
      .getPaymentDetails(this.lang, payment.id, this.type)
      .subscribe(res => {
        Loading.instance.hide();
        // this.clearRoot();
        PopupService.instance.open(
          PaymentDetails,
          payment,
          res.data.accounts,
          this.type
        );
        this.root.appendChild(PopupService.instance.DOM);
      });
  }

  private routerListener(): void {
    RouterService.instance.onRouteChange.subscribe((val: any) => {
      console.log(val);
      if (val === 'back') {
        this.drawPaymentsList();
      } else {
        this.drawPaymentDetails(val);
      }
    });
  }

  private clearRoot(): void {
    console.log('clear');
    PopupService.instance.destroy();
    if (this.paymentList) this.paymentList.destroy();
    if (this.root) this.root.innerHTML = '';
  }

  public get staticUrl(): string {
    return this._staticUrl;
  }

  public get locale(): any {
    return this._locale;
  }
}
