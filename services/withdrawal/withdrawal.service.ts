import { AxiosError, AxiosResponse } from 'axios';
import { getUserWithdrawalRequestUrl } from '@/config/api.config';
import axiosInter from '@/api/interceptors';
import { UserWithdrawalRequestBoby } from '@/types/withdrawal.interface';

export const WithdrawalService = {
  /*   async getApiToken(): Promise<any> {
    try {
      const res: AxiosResponse<any> = await axiosInter.get(getUserApiTokenUrl());
      console.log(res);

      return res.data?.token;
    } catch (error) {
      throw error;
    }
  }, */
  async newWithdrawalRequest(body: UserWithdrawalRequestBoby): Promise<any> {
    try {
      const res: AxiosResponse<any> = await axiosInter.post(getUserWithdrawalRequestUrl(), body);
      console.log(res);

      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data.amount || 'Unknown error';
        console.log('message', message, 'data', error.response?.data);
        return { error: error.response?.data };
      } else {
        console.error('Error:', error);
      }
    }
  },
};
