import axiosInter, { axiosSimple } from '@/api/interceptors';
import { getAuthUrl } from '@/config/api.config';
import { AuthResponse, EmailPassword } from '@/types/user.interface';
import { removeTokensUser, storageUser } from './auth.helper';
import { getContentType } from '@/api/api.helper';
import Cookies from 'js-cookie';

export const AuthService = {
  async login({ username, email, password, code = 'string' }: EmailPassword) {
    const response = await axiosSimple.post<AuthResponse>(getAuthUrl('/auth/authorization/'), {
      is_admin: false,
      username: username ?? email,
      password,
      code: code ?? 'string',
    });

    if (response.data.access) storageUser(response.data, { username: username ?? email, is_admin: true });
    return response;
  },
  async register({ username, email, password }: EmailPassword) {
    const response = await axiosSimple.post<AuthResponse>(getAuthUrl('/auth/registration'), {
      username: username ?? email,
      email: email,
      password,
      referral: '',
    });
    if (response.data.access) {
      const user = storageUser(response.data, { username: username ?? email });
      console.log(user);
    }
    return response;
  },
  logout() {
    removeTokensUser();
    return true;
  },
  async getNewTokens() {
    const response = await axiosInter.post(getAuthUrl('/jwt/refresh'), {
      refresh: Cookies.get('refresh'),
    });

    console.log('Get new', response);

    if (response.data.access)
      storageUser(response.data, { username: undefined, is_admin: Cookies.get('is_admin') === 'true' });
    return response;
  },
};
