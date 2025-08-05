// api.config.ts
const ensureTrailingSlash = (url: string) => {
  return url.endsWith('/') ? url : `${url}/`;
};

// Helper function to create proxy URL
export const createProxyUrl = (endpoint: string) => {
  // Return proxy URL that points to our Next.js API route
  return `/api/proxy?endpoint=${encodeURIComponent(endpoint)}`;
};

// no token requests
export const postCreatedExchange = (s: string = '/') =>
  createProxyUrl(ensureTrailingSlash(`exchange/api/create${s}`));

export const getExchangeByUniqueIdUrl = (s: string = '/') =>
  createProxyUrl(ensureTrailingSlash(`exchange/api${s}`));

export const getStopExchangeUrl = (uniqueId: string) =>
  createProxyUrl(ensureTrailingSlash(`exchange/api/${uniqueId}/transaction_stopped`));

export const getQuoteRangeWhitebitUrl = (s: string = '/') =>
  createProxyUrl(ensureTrailingSlash(`exchange/api/quote-range-whitebit${s}`));

export const getQuoteOneWhitebitUrl = (s: string = '/') =>
  createProxyUrl(ensureTrailingSlash(`exchange/api/quote-one-whitebit${s}`));

export const getRefferralExchangesUrl = (s: string = '/') =>
  createProxyUrl(ensureTrailingSlash(`/exchange/api/referral${s}`));

export const getAuthUrl = (s: string = '/') => createProxyUrl(ensureTrailingSlash(`user/api${s}`));

export const getUserStatUrl = (s: string = '/') =>
  createProxyUrl(ensureTrailingSlash(`user/api/user/statistics${s}`));

export const getUserRefLinkUrl = (s: string = '/') =>
  createProxyUrl(ensureTrailingSlash(`user/api/user/link${s}`));

export const getUserApiTokenUrl = (s: string = '/') =>
  createProxyUrl(ensureTrailingSlash(`user/api/user/token${s}`));

export const getUserStatisticUrl = (s: string = '/') =>
  createProxyUrl(ensureTrailingSlash(`user/api/user/statistics${s}`));

export const getUserWithdrawalRequestUrl = (s: string = '/') =>
  createProxyUrl(ensureTrailingSlash(`user/api/user/withdraw${s}`));

export const getDateRangeStatisticUrl = (s: string = '/') =>
  createProxyUrl(ensureTrailingSlash(`statistic/api/date-range${s}`));

// admin
export const getNetworkListUrl = (s: string = '/') =>
  createProxyUrl(ensureTrailingSlash(`network/api/network${s}`));

export const getAllDepositsUrl = (s: string = '/') => createProxyUrl(ensureTrailingSlash(`api/deposits${s}`));

export const getOrdersUrl = (s: string = '/') => createProxyUrl(ensureTrailingSlash(`/api/orders${s}`));

export const getAllExchangeUrl = (s: string = '/') =>
  createProxyUrl(ensureTrailingSlash(`api/exchanges${s}`));

// coin no auth
export const getCoinUrl = (s: string = '/') => createProxyUrl(ensureTrailingSlash(`coin/api/coin${s}`));

export const validateWalletUrl = (s: string = '/') =>
  createProxyUrl(ensureTrailingSlash(`coin/api/wallet/validate${s}`));

export const getAllWithdrawalsUrl = (s: string = '/') =>
  createProxyUrl(ensureTrailingSlash(`api/withdrawals${s}`));

//exchange no auth
export const getExchange = (s: string = '/') => createProxyUrl(ensureTrailingSlash(`exchange/api${s}`));

// general settings
export const getFeeSettingsUrl = (s: string = '/') => createProxyUrl(ensureTrailingSlash(`api/feesettings${s}`));

export const getConstantNumericUrl = (key: string) => createProxyUrl(ensureTrailingSlash(`constant/api/numeric/${key}`));

export const getConstantJsonUrl = (key: string) => createProxyUrl(ensureTrailingSlash(`constant/api/json/${key}`));

export const getAMLThresholdUrl = (s: string = '/') => createProxyUrl(ensureTrailingSlash(`api/aml_threshold${s}`));

export const getNetworkGateUrl = (s: string = '/') => createProxyUrl(ensureTrailingSlash(`network/api${s}`));
