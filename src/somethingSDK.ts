import { Core } from './app/core';
import './styles/style.scss';

export function init(params: any): void {
  Core.instance.init(params);
}

//// uncommit for initialize immediately
//init('ka', 'Deposit', 0, '');
