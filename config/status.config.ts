export const ExchangeProcessStatus = {
  1: 'waiting', // a deposit from the user is expected
  2: 'confirmation', // deposit received, awaiting blockchain confirmation
  3: 'transferring', // deposit confirmed, funds are being moved for exchange
  4: 'exchanging', // exchange to the target coin is in progress
  5: 'sending', // target funds are being sent to the user’s address
  6: 'success', // exchange completed successfully, funds delivered
  7: 'overdue', // deposit window expired or other timeout reason
  8: 'frozen', // order frozen; possibly suspected fraud or support decision
  9: 'problematic', // an issue occurred; usually requires support intervention
  10: 'refunded', // funds returned to the user because the exchange couldn’t be completed
};
export const OrderProcessStatus = {
  filled: 'filled', // a deposit from the user is expected
};
export const WithdrawalProcessStatus = {
  6: 'success', // exchange completed successfully, funds delivered
};
