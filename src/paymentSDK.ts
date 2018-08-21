import { Core } from './app/core';
import './styles/style.scss';

export function init(
  lang: string,
  type: 'Deposit' | 'Withdraw',
  userId: number,
  providerId: string
): void {
  Core.instance.init(lang, type, userId, providerId);
}

init('ka', 'Deposit', 0, '');
