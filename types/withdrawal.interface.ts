export interface UserWithdrawalRequestBoby {
  coin: string;
  amount: number;
  address: string;
  memo?: string;
}

export interface GetWithdrawalParams {
  page: string;
  coin?: string;
  date?: string;
  page_size?: string;
  search?: string;
  status?: string;
  withdrawal_id?: string;
}

export interface GetWithdrawalItem {
  id: number;
  withdrawal_time: string;
  withdrawal_id: string;
  status: string;
  platform: string;
  coin: string;
  amount: string;
  txid: string;
  address: string;
  memo: string;
  fee: string;
}
