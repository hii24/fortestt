import adminTokens from '@/config/admin-tokens.json';

export interface AdminTokens {
  access: string;
  refresh: string;
}

export const getAdminTokens = (): AdminTokens => {
  return adminTokens;
};

export const getAdminAccessToken = (): string => {
  return adminTokens.access;
};

export const getAdminRefreshToken = (): string => {
  return adminTokens.refresh;
};

// Проверка срока действия токена (примерная)
export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  } catch (error) {
    console.error('Error parsing token:', error);
    return true; // Если не можем распарсить, считаем токен истекшим
  }
};

// Проверка срока действия access токена
export const isAdminAccessTokenExpired = (): boolean => {
  return isTokenExpired(adminTokens.access);
};

// Проверка срока действия refresh токена
export const isAdminRefreshTokenExpired = (): boolean => {
  return isTokenExpired(adminTokens.refresh);
};

// Получение информации о токене
export const getTokenInfo = (token: string) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
      exp: new Date(payload.exp * 1000),
      iat: new Date(payload.iat * 1000),
      user_uid: payload.user_uid,
      token_type: payload.token_type,
    };
  } catch (error) {
    console.error('Error parsing token:', error);
    return null;
  }
};

// Получение информации о токенах админа
export const getAdminTokenInfo = () => {
  return {
    access: getTokenInfo(adminTokens.access),
    refresh: getTokenInfo(adminTokens.refresh),
  };
}; 