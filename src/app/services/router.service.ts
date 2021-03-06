import { Observable, Observer } from 'rxjs';

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

  public onSomePage(page: string, params: any): void {
    this.observer.next({ page, params });
  }
  public onBack(): void {
    this.observer.next({ page: 'back' });
  }
}
