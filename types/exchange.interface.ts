export interface CreateExchangeBody {
  from_amount: number;
  address: string;
  memo: string;
  terms: boolean;
  fixed: boolean;
  support_email: string;
  withdraw_refund: string;
  from_pair_id: number;
  to_pair_id: number;
  to_amount: string;
  referral: string | null;
  key: string;
}

export interface ValidCreatedResponse {
  exchange_id: string;
  deposit_address: string;
  deposit_memo: null;
  support_email?: string[];
}

export interface GetExchangeParams {
  date?: string;
  page?: string;
  page_size?: string;
  search?: string;
  status?: string;
  token?: string;
  token1?: string;
  token1_network?: string;
  token2?: string;
  token2_network?: string;
  unique_id?: string;
}

export interface GetExchangesItem {
  id: number;
  deposit: any;
  node_deposit: any;
  buy_orders: any[];
  sell_orders: any[];
  withdrawal: any;
  unique_id: string;
  fixed: boolean;
  terms: boolean;
  token1: string;
  token1_network: string;
  token2: string;
  token2_network: string;
  address: string;
  memo: string;
  node_deposit_address: any;
  node_deposit_memo: any;
  deposit_address: string;
  deposit_memo: any;
  status: number;
  start_time: string;
  end_time: any;
  token1_amount: any;
  token2_amount: any;
  exp_token1_amount: number;
  exp_token2_amount: number;
  volume: number;
  profit: any;
  partner_profit: any;
  is_stopped: boolean;
  support_email: string;
  withdraw_refund: string;
  note: string;
  referral: any;
}

export interface ExchangeCheckingItem {
  transactions: any;
  id: number;
  unique_id: string;
  fixed: boolean;
  terms: boolean;
  token1: string;
  token1_network: string;
  token2: string;
  token2_network: string;
  address: string;
  memo: any;
  node_deposit_address: any;
  node_deposit_memo: any;
  deposit_address: string;
  deposit_memo: any;
  status: number;
  start_time: string;
  end_time: any;
  token1_amount: number;
  token2_amount: number;
  exp_token1_amount: any;
  exp_token2_amount: any;
  volume: any;
  is_stopped: boolean;
  support_email: string;
  withdraw_refund: string;
  note: string;
  token1_title?: string;
  token2_title?: string;
}

export interface ManualUpdateExchangeBody {
  buy_orders: string[];
  sell_orders: string[];
  deposit: string;
  node_deposit: string | null;
  withdrawal: string | null;
  status: number;
  is_stopped: boolean;
  note: string;
}
