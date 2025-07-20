import { AxiosError, AxiosResponse } from 'axios';

import { getCoinUrl, getExchange, validateWalletUrl } from '@/config/api.config';
import { axiosSimple } from '@/api/interceptors';
import { ResponseList } from '@/types/response.interface';
import { CalculateExchangeBody, CoinsListParams, ValidWalletBody } from '@/types/coin.interface';

export const CoinService = {
  async getCoinsList(params?: CoinsListParams): Promise<any> {
    try {
      const res: AxiosResponse<ResponseList<any>> = await axiosSimple.get(
        getCoinUrl(),
        params ? { params } : {}
      );
      console.log('result', res);

      return res.data;
    } catch (error) {
      console.log(error);
      throw error; // Re-throw to handle in component
    }
  },

  async validateWallet(body: ValidWalletBody): Promise<any> {
    try {
      const res: AxiosResponse<any> = await axiosSimple.post(validateWalletUrl(), body);
      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data.amount || 'Unknown error';
        console.log('message', message, 'data', error.response?.data);
        return error.response?.data;
      } else {
        console.error('Error:', error);
      }
    }
  },
  async calculateExchangeRate(body: CalculateExchangeBody): Promise<any> {
    try {
      const res: AxiosResponse<any> = await axiosSimple.post(getExchange('/calculate'), body);
      // console.log(res);

      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data.amount || 'Unknown error';
        console.log('message', message, 'data', error.response?.data);
        return error.response?.data;
      } else {
        console.error('Error:', error);
      }
    }
  },
};
