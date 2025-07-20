export interface ResponseList<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface Order {
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

export type EmptyResponse = {
  status: number;
  message: string;
};
