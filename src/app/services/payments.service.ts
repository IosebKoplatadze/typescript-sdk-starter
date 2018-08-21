import { Payment } from '../models/payment';
import { of, Observable, Observer } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Config } from '../config';

export class PaymentsService {
  private static _paymentsService: PaymentsService;

  private constructor() {}

  public static get instance(): PaymentsService {
    return (
      PaymentsService._paymentsService ||
      (PaymentsService._paymentsService = new this())
    );
  }

  public getPaymentsList(
    lang: string,
    type: 'Deposit' | 'Withdraw'
  ): Observable<any> {
    return this.sendRequest(
      'POST',
      'https://demo0940767.mockable.io/service1' //`${Config.apiEndpoint}/api/payments/init?lang=${lang}&operation_type${type}`
    );
  }

  public getPaymentDetails(
    lang: string,
    paymentId: number,
    type: 'Deposit' | 'Withdraw'
  ): Observable<any> {
    return this.sendRequest(
      'POST',
      'https://demo0940767.mockable.io/service2' //`${Config.apiEndpoint}/api/payment/details?lang=${lang}&payment_id=${paymentId}&transaction_type=${type}`
    );
  }

  private sendRequest(method: 'POST' | 'GET', url: string): Observable<any> {
    const xhr = new XMLHttpRequest();

    return Observable.create((observer: Observer<any>) => {
      xhr.open(method, url, true);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            observer.next(JSON.parse(xhr.response));
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      };

      xhr.send();
    });
  }
}
