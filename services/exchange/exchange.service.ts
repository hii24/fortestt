import { AxiosError, AxiosResponse } from 'axios';

import {
  getExchangeByUniqueIdUrl,
  getQuoteOneWhitebitUrl,
  getQuoteRangeWhitebitUrl,
  getRefferralExchangesUrl,
  postCreatedExchange,
  getStopExchangeUrl,
} from '@/config/api.config';
import axiosInter, { axiosSimple } from '@/api/interceptors';
import { CreateExchangeBody } from '@/types/exchange.interface';

export const ExchangeService = {
  async getExchangeByUniqueId(id: string): Promise<any> {
    try {
      const res: AxiosResponse<any> = await axiosSimple.get(getExchangeByUniqueIdUrl(id));
      console.log('fetched', res.data);

      return res.data;
    } catch (error) {
      return null;
    }
  },

  async quoteRangeWhitebit({ coin_id }: { coin_id: number }): Promise<any> {
    try {
      const res: AxiosResponse<any> = await axiosSimple.get(getQuoteRangeWhitebitUrl(), {
        params: {
          coin_id,
          // to_coin_id,
        },
      });
      console.log(res);

      return res.data;
    } catch (error) {
      return null;
    }
  },

  async quoteOneWhitebit({
    from_coin_id,
    to_coin_id,
    fee_type,
  }: {
    from_coin_id: number;
    to_coin_id: number;
    fee_type: string;
  }): Promise<any> {
    try {
      const res: AxiosResponse<any> = await axiosSimple.get(getQuoteOneWhitebitUrl(), {
        params: {
          from_coin_id,
          to_coin_id,
          fee_type,
        },
      });
      console.log(res);

      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return { error: error.response?.data?.error ?? null };
      } else {
        console.error('Error:', error);
        return null;
      }
    }
  },

  async getRefferralExchanges({
    page,
    page_size,
    start_time__gte,
    start_time__lte,
  }: {
    page: number;
    page_size: number;
    start_time__gte?: string;
    start_time__lte?: string;
  }): Promise<any> {
    try {
      const params: any = {
        page,
        page_size,
      };

      if (start_time__gte) params.start_time__gte = start_time__gte;
      if (start_time__lte) params.start_time__lte = start_time__lte;

      const res: AxiosResponse<any> = await axiosInter.get(getRefferralExchangesUrl(), { params });
      console.log(res);

      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return { error: error.response?.data?.error ?? null };
      } else {
        console.error('Error:', error);
        return null;
      }
    }
  },

  async updateExchange(uniqueId: string, body: { status?: number; [key: string]: any }): Promise<any> {
    try {
      const url = `/api/proxy?endpoint=${encodeURIComponent(`exchange/api/${uniqueId}/edit/`)}`;
      console.log('Update Exchange URL:', url);
      console.log('Update Exchange Body:', body);
      
      const res: AxiosResponse<any> = await axiosInter.patch(url, body);
      console.log('Exchange updated successfully:', res.data);
      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('Update Exchange Error:', error.response?.data);
        console.error('Update Exchange Status:', error.response?.status);
        console.error('Update Exchange URL:', error.config?.url);
        return error.response?.data;
      } else {
        console.error('Error:', error);
        return null;
      }
    }
  },

  async stopExchange(uniqueId: string): Promise<any> {
    try {
      const res: AxiosResponse<any> = await axiosInter.patch(getStopExchangeUrl(uniqueId));
      console.log('Exchange stopped successfully:', res.data);
      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('Stop Exchange Error:', error.response?.data);
        return error.response?.data;
      } else {
        console.error('Error:', error);
        return null;
      }
    }
  },

  async createExchange(body: CreateExchangeBody): Promise<any> {
    try {
      const res: AxiosResponse<any> = await axiosSimple.post(postCreatedExchange(), body);
      console.log(res);

      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        // const message = error.response?.data.amount || 'Unknown error';
        console.log('Create Exchange Error', 'data', error.response?.data);
        return error.response?.data;
      } else {
        console.error('Error:', error);
      }
    }
  },
};
