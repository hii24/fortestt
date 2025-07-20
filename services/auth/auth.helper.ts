import { User } from '@/types/user.interface';
import { AuthResponse, Tokens } from '@/types/user.interface';
import { getLocalStoreItem } from '@/utils/local.storage';
import Cookies from 'js-cookie';

export const checkAccessExists = (): boolean => !!Cookies.get('access');

export const tokensUser = (data: Tokens) => {
  Cookies.set('access', data.access);
  Cookies.set('refresh', data.refresh, {
    secure: process.env.NEXT_PUBLIC_ENV === 'production',
  });
};

export const removeTokensUser = () => {
  Cookies.remove('access');
  Cookies.remove('refresh');
  localStorage.removeItem('user');
  return true;
};

export const storageUser = (
  data: AuthResponse,
  { username = getLocalStoreItem('user')?.user?.username ?? 'Unsaved user', is_admin = false }
) => {
  console.log('setting is admin ===', is_admin);
  tokensUser(data);
  Cookies.set('is_admin', `${is_admin}`, { secure: process.env.NEXT_PUBLIC_ENV === 'production' });
  const savedUser = data?.user ?? {
    user: {
      is_admin: is_admin,
      username: username,
    } as User,
  };
  localStorage.setItem('user', JSON.stringify(savedUser));
  return savedUser;
};
