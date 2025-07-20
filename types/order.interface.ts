export interface DepositeParams {
  coin?: string;
  date?: any;
  deposit_id?: string;
  page?: number;
  page_size?: string;
  search?: string;
  status?: string;
}
export interface OrderParams {
  date?: any;
  order_id?: string;
  page?: number;
  page_size?: number;
  pair?: string;
  search?: string;
  status?: string;
}

export interface GetAllOrdersItem {
  id: number;
  order_id: string;
  order_time: string;
  filled: string;
  total: string;
  status: string;
  fee: string;
  exchange_id: any;
  platform: string;
  pair: string;
  price: string;
  amount: string;
  side: string;
  order_type: string;
}
