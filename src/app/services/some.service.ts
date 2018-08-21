import { Observable, Observer } from 'rxjs';

export class SomeService {
  private static _someService: SomeService;

  private constructor() {}

  public static get instance(): SomeService {
    return SomeService._someService || (SomeService._someService = new this());
  }

  public getData(params: any): Observable<any> {
    return this.sendRequest('GET', 'https://example.com');
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
