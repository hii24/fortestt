import axiosOrigin from 'axios';
import Cookies from 'js-cookie';
import { catchError, getContentType } from './api.helper';
import { AuthService } from '@/services/auth/auth.service';
import { removeTokensUser } from '@/services/auth/auth.helper';

const basicConf = {
  // baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  headers: getContentType(),
};

export const axiosSimple = axiosOrigin.create(basicConf);

const axiosInter = axiosOrigin.create(basicConf);

axiosInter.interceptors.request.use((config) => {
  const access = Cookies.get('access');

  if (config.headers && access) {
    config.headers.Authorization = `Bearer ${access}`;
  }

  return config;
});

axiosInter.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;
    const message = catchError(error);
    // && message === 'Request failed with status code 401'
    if (error.response.status === 403 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
      console.log('RETRY SINGIN INTER');
      try {
        await AuthService.getNewTokens();
        return axiosInter.request(originalRequest);
      } catch (error) {
        if (message === 'Request failed with status code 401') {
          removeTokensUser();
        }
      }
    }
    throw error;
  }
);

export default axiosInter;
