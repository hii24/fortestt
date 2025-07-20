import { AxiosResponse } from 'axios';
import axiosInter from '@/api/interceptors';
import {
  getAllDepositsUrl,
  /* getAllDepositsUrl, */ getAllExchangeUrl,
  getAllWithdrawalsUrl,
  getOrdersUrl,
} from '@/config/api.config';
import { EmptyResponse, ResponseList } from '@/types/response.interface';
import { GetExchangeParams, GetExchangesItem } from '@/types/exchange.interface';
import { DepositeParams, GetAllOrdersItem, OrderParams } from '@/types/order.interface';
import { GetWithdrawalItem, GetWithdrawalParams } from '@/types/withdrawal.interface';

export const AdminService = {
  async getAllExchanges(
    params: GetExchangeParams | undefined = undefined
  ): Promise<ResponseList<GetExchangesItem> | EmptyResponse> {
    try {
      const res: AxiosResponse<ResponseList<GetExchangesItem>> = await axiosInter.get(getAllExchangeUrl(), {
        params: params ? params : {},
      });
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
  async getAllWithdrawals(
    params: GetWithdrawalParams | undefined = undefined
  ): Promise<ResponseList<GetWithdrawalItem> | EmptyResponse> {
    try {
      const res: AxiosResponse<ResponseList<GetWithdrawalItem>> = await axiosInter.get(
        getAllWithdrawalsUrl(),
        {
          params: params ? params : {},
        }
      );
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
  async getOrders(params: OrderParams | undefined = undefined): Promise<any> {
    try {
      const res: AxiosResponse<ResponseList<GetAllOrdersItem>> = await axiosInter.get(getOrdersUrl(), {
        params: params ? params : {},
      });
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
  async getAllDeposits(params: DepositeParams | undefined = undefined): Promise<any> {
    try {
      const res: AxiosResponse<any> = await axiosInter.get(getAllDepositsUrl(), {
        params: params ? params : {},
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
