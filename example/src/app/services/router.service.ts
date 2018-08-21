import { Observable, Observer } from 'rxjs';
import { Payment } from '../models/payment';

export class RouterService {
  private static _routerService: RouterService;

  private observable$: Observable<any>;
  private observer: Observer<any>;

  private constructor() {
    this.observable$ = Observable.create((observer: Observer<any>) => {
      this.observer = observer;
    });
  }

  public static get instance(): RouterService {
    return (
      RouterService._routerService ||
      (RouterService._routerService = new this())
    );
  }

  public get onRouteChange() {
    return this.observable$;
  }

  public onPaymentDetails(payment: Payment): void {
    this.observer.next(payment);
  }
  public onBack(): void {
    this.observer.next('back');
  }
}
