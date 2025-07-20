export const getContentType = () => ({
  'Content-Type': 'application/json',
  // REMOVE API key from here - let the proxy handle it
});

export const catchError = (error: any): string => {
  console.log('auth response', error.response);
  console.log('auth request', error.request);
  return error.response && Object.keys(error.response.data).length
    ? error.response.data?.message || error.response.data?.detail || error?.message
    : error?.message;
};
