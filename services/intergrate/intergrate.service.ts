import { AxiosResponse } from 'axios';

import { getUserApiTokenUrl, getUserRefLinkUrl } from '@/config/api.config';
import axiosInter from '@/api/interceptors';

export const IntergrateService = {
  async getApiToken(): Promise<any> {
    try {
      const res: AxiosResponse<any> = await axiosInter.get(getUserApiTokenUrl());
      console.log(res);

      return res.data?.token;
    } catch (error) {
      throw error;
    }
  },
  async getRefferalLink(): Promise<any> {
    try {
      const res: AxiosResponse<any> = await axiosInter.get(getUserRefLinkUrl());
      console.log(res);

      return res.data?.link;
    } catch (error) {
      throw error;
    }
  },
};
