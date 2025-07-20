import { AxiosResponse } from 'axios';
import axios from '@/api/interceptors';
import { getAuthUrl, getDateRangeStatisticUrl, getUserStatisticUrl } from '@/config/api.config';

export const UserService = {
  async changePassword({
    old_password,
    new_password,
  }: {
    old_password?: string;
    new_password?: string;
  }): Promise<any> {
    try {
      const res: AxiosResponse<any> = await axios.post(getAuthUrl('/auth/change-password'), {
        old_password,
        new_password,
      });
      if (res?.status === 204) {
        return {
          status: res.status,
          message: 'Password changed',
        };
      }
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async getStatistic(): Promise<any> {
    try {
      const res: AxiosResponse<any> = await axios.get(getUserStatisticUrl());
      console.log(res);
      if (res?.status === 204) {
        return {
          status: res.status,
          message: 'Done, but no content yet',
        };
      }
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async getStatisticByRange(date_from = '2025-03-10', date_to = '2025-03-22'): Promise<any> {
    try {
      const res: AxiosResponse<any> = await axios.post(getDateRangeStatisticUrl(), {
        date_from,
        date_to,
      });
      console.log(res);
      if (res?.status === 204) {
        return {
          status: res.status,
          message: 'Done, but no content yet',
        };
      }
      return res.data;
    } catch (error) {
      throw error;
    }
  },
};
