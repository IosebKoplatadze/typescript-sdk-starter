export interface Payment {
  id: number;
  name: string;
  logo: string;
  description: string;
  short_description: string;
  template: string;
  type: number;
  min_amount: number;
  max_amount: string;
  instruction: string;
  supported_operations: SupportedOperations;
  commission: string;
  currency: string;
}

export enum SupportedOperations {
  Deposit = 1,
  Withdraw,
  Both
}
