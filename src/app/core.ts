import { Config } from './config';
import { RouterService } from './services/router.service';
import { SomeService } from './services/some.service';
import { Loading } from './components/loading';
import { Component } from './components/component';

export class Core {
  private static _core: Core;
  private root: HTMLElement;
  private someComponent: Component;
  private params: any;

  private constructor() {}

  public static get instance(): Core {
    return Core._core || (Core._core = new this());
  }

  public init(params: any) {
    this.params = params;
    const sdkSomething = document.getElementById(Config.sdkSomethingId);
    this.clearRoot();
    sdkSomething.innerHTML = '';
    this.root = document.createElement('div');
    // this.root.classList.add('someClass');
    sdkSomething.appendChild(this.root);
    sdkSomething.appendChild(Loading.instance.DOM);
    this.drawHome();
    this.routerListener();
  }

  private drawHome(): void {
    Loading.instance.show();
    SomeService.instance.getData('params').subscribe(res => {
      Loading.instance.hide();
      //do something
      //E.G. make home component and add it to root
    });
  }

  private routerListener(): void {
    RouterService.instance.onRouteChange.subscribe((val: any) => {
      console.log(val);
      if (val.page === 'back') {
        //do something
      } else {
        switch (val.page) {
          case 'home':
            this.drawHome();
            break;
          //.....
        }
      }
    });
  }

  private clearRoot(): void {
    console.log('clear');
    if (this.someComponent) this.someComponent.destroy();
    if (this.root) this.root.innerHTML = '';
  }
}
