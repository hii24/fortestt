export interface CurrencyProps {
  token: string;
  title: string;
  is_memo: boolean;
  networks: {
    id: number;
    title: string;
  }[];
}

export interface CurrencyPropsFinal {
  token: string;
  title: string;
  is_memo: boolean;
  network: {
    id: number;
    title: string;
  };
}

export interface ValidWalletBody {
  address: string;
  currency_name: string;
}

export interface CalculateExchangeBody {
  from_pair_id: number;
  to_pair_id: number;
  amount: string;
  commission_type: 'fix' | 'float';
}

export interface CoinsListParams {
  page?: number;
  page_size?: number;
  search?: string;
}

export interface CoinsListItemNetwork {
  id: number;
  title: string;
}

export interface CoinsListItem {
  token: string;
  title: string;
  is_memo: boolean;
  networks: CoinsListItemNetwork[];
}
