// 'use client';

// import { FormEvent, Suspense, useState } from 'react';
// import { Checkbox, Input, Tooltip } from 'antd';
// import SwapSelector from '@/app/(main)/components/exchange/SwapSelector';
// import styles from './styles.module.css';
// import Image from 'next/image';
// import { CurrencyProps } from '@/types/coin.interface';
// import { ExchangeService } from '@/services/exchange/exchange.service';
// import { CreateExchangeBody, ValidCreatedResponse } from '@/types/exchange.interface';
// import { usePathname, useRouter, useSearchParams } from 'next/navigation';
// import { SwitcherWIcon } from '@/app/components/SwitcherWIcon/SwitcherWIcon';

// const ExchangeTransfer = () => {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const pathname = usePathname();

//   const floatRateParam = searchParams.get('floatRate');
//   const amountParam = searchParams.get('amount');
//   const fromParam = searchParams.get('from');
//   const toParam = searchParams.get('to');

//   const [floatRate, setFloatRate] = useState(floatRateParam === 'true');
//   const [fromAmount, onFromAmountChange] = useState(amountParam ?? '0.1');
//   const [toAmount, onToAmountChange] = useState('0');
//   const [isError, setIsError] = useState('');

//   const [fromCurrency, onFromCurrencyChange] = useState<CurrencyProps>(() => {
//     if (fromParam) {
//       try {
//         return JSON.parse(fromParam);
//       } catch {
//         return {
//           token: 'BTC',
//           title: 'Bitcoin',
//           network: { id: 65, title: 'BTC' },
//           is_memo: false,
//         };
//       }
//     }
//     return {
//       token: 'BTC',
//       title: 'Bitcoin',
//       network: { id: 65, title: 'BTC' },
//       is_memo: false,
//     };
//   });

//   const [toCurrency, onToCurrencyChange] = useState<CurrencyProps>(() => {
//     if (toParam) {
//       try {
//         return JSON.parse(toParam);
//       } catch {
//         return {
//           token: 'SOL',
//           title: 'Solana',
//           network: { id: 260, title: 'SOL' },
//           is_memo: false,
//         };
//       }
//     }
//     return {
//       token: 'SOL',
//       title: 'Solana',
//       network: { id: 260, title: 'SOL' },
//       is_memo: false,
//     };
//   });

//   //send form
//   const [walletAddress, setWalletAddress] = useState('');
//   const [memoAddress, setMemoAddress] = useState('');
//   const [refundAddress, setRefundAddress] = useState('');
//   const [email, setEmail] = useState('');

//   const [confTerms, setConfTerms] = useState(false);

//   const onAddExchange = async (e: FormEvent) => {
//     e.preventDefault();

//     const formFromAmount = Number(fromAmount);
//     const formToAmount = Number(toAmount);
//     if (
//       !isNaN(formFromAmount) &&
//       isFinite(formFromAmount) &&
//       !isNaN(formToAmount) &&
//       isFinite(formToAmount)
//     ) {
//       if (!fromCurrency?.network?.id || !toCurrency?.network?.id) {
//         console.warn('Invalid IDs');
//         return;
//       }

//       if (fromCurrency?.is_memo && !memoAddress.trim()) {
//         console.warn('Must have Memo');
//         return;
//       }

//       const SubmitBody: CreateExchangeBody = {
//         from_amount: formFromAmount,
//         address: walletAddress.trim(),
//         memo: memoAddress.trim() ?? '',
//         terms: confTerms,
//         fixed: floatRate,
//         support_email: email, // 'test@gmail.com'
//         withdraw_refund: refundAddress.trim() ?? '',
//         from_pair_id: fromCurrency.network.id!,
//         to_pair_id: toCurrency.network.id!,
//         to_amount: toAmount,
//         referral: null,
//       };

//       console.warn(SubmitBody);

//       const resp: ValidCreatedResponse = await ExchangeService.createExchange(SubmitBody);

//       if (resp && resp.deposit_address && resp.exchange_id) {
//         const url = `${pathname}/${resp.exchange_id}${resp?.deposit_memo ? `?deposit_memo=${encodeURIComponent(resp.deposit_memo)}` : ''}`;
//         router.push(url);
//       }

//       setIsError(`${resp?.support_email ?? ''}`);

//       console.log('Add exchange', resp);
//       console.log(walletAddress);
//     }
//   };

//   return (
//     <div className=" mt-2 mb-3 sm:mt-10 max-xl:w-full px-3">
//       {/* Exchange Bloxk */}
//       <div className={`${styles.exchangeContainer} !mt-0`}>
//         <h1 className="text-center font-medium">Add exchange details</h1>
//       </div>
//       {/* Exchange Inputs */}
//       <div className={styles.exchangeContainer}>
//         <div className="w-full mb-8">
//           <SwapSelector
//             floatRate={floatRate}
//             fromCurrency={fromCurrency}
//             setFromCurrencyChange={onFromCurrencyChange}
//             toCurrency={toCurrency}
//             setToCurrencyChange={onToCurrencyChange}
//             fromAmount={fromAmount}
//             onFromAmountChange={onFromAmountChange}
//             toAmount={toAmount}
//             onToAmountChange={onToAmountChange}
//           />
//         </div>

//         <div className="w-full pb-7">
//           <SwitcherWIcon checked={floatRate} setChecked={setFloatRate} />
//         </div>

//         <form className="w-full" onSubmit={onAddExchange}>
//           {/* Wallet Address */}
//           <div className="w-full mb-4">
//             <p className="text-gray-700 mb-2 text-sm font-medium">Enter wallet address</p>
//             <Input
//               required
//               placeholder="Enter the recipient's address"
//               value={walletAddress}
//               onChange={(e) => setWalletAddress(e.target.value)}
//               size="large"
//               suffix={
//                 <Tooltip title="Qr">
//                   {/* <CopyOutlined className="text-gray-400 cursor-pointer" /> */}
//                   <Image
//                     width={20}
//                     height={20}
//                     src="/icons/qr.svg"
//                     alt="qr"
//                     className="text-gray-400 cursor-pointer"
//                   />
//                 </Tooltip>
//               }
//             />
//           </div>

//           {(fromCurrency.is_memo || toCurrency.is_memo) && (
//             <div className="w-full">
//               <p className="text-gray-700 mb-2 text-sm font-medium">Enter Memo address</p>
//               <Input
//                 required={fromCurrency.is_memo || toCurrency.is_memo}
//                 placeholder="Enter the recipient's address"
//                 value={memoAddress}
//                 onChange={(e) => setMemoAddress(e.target.value)}
//                 size="large"
//                 suffix={
//                   <Tooltip title="Qr">
//                     {/* <CopyOutlined className="text-gray-400 cursor-pointer" /> */}
//                     <Image
//                       src="/icons/copy.svg"
//                       width={20}
//                       height={20}
//                       alt="qr"
//                       className="text-gray-400 cursor-pointer"
//                     />
//                   </Tooltip>
//                 }
//               />
//             </div>
//           )}

//           <div className={`flex gap-2 justify-start items-center py-3 ${''}`}>
//             <Checkbox
//               required
//               checked={confTerms}
//               onChange={() => {
//                 setConfTerms((prev) => !prev);
//               }}
//             />
//             <p className={styles.policyTermsTextBox}>
//               I agree to the
//               <a href="/privacy-policy" target="_blank" className="text-blue-500">
//                 {' Privacy Policy '}
//               </a>
//               and
//               <a href="/temp-of-use" target="_blank" className="text-blue-500">
//                 {' Terms of Service '}
//               </a>
//               when I click
//               <a href="/temp-of-use" target="_blank" className="text-blue-500">
//                 {' Create an exchange'}
//               </a>
//               .
//             </p>
//           </div>
//           {/* Exchange Button */}
//           <button className={`${styles.exchangeBtn} mb-3`}>
//             <span>Create an exchange</span>
//           </button>
//           {/* Terms */}
//           {/* <p className="text-center text-xs text-gray-500 mb-8">

//           </p> */}
//         </form>
//       </div>
//       <div className={styles.exchangeContainer}>
//         <div className="w-full mb-2 ml-1">
//           <p className="text-gray-700 mb-2 text-sm font-medium">Receiving address(Optional)</p>
//           <Input
//             placeholder="Filling in your wallet address for a refund is optional."
//             value={refundAddress}
//             onChange={(e) => setRefundAddress(e.target.value)}
//             size="large"
//           />
//           <p className="text-xs mt-2 text-gray-500">We recommend adding your wallet address for a refund</p>
//         </div>

//         <div className="w-full mb-2 ml-1">
//           <p className={!isError ? 'text-gray-700 mb-2 text-sm font-medium' : 'text-red-500'}>
//             Email for notifications(Optional)
//           </p>
//           <Input
//             placeholder="Receiving notifications about this exchange is optional."
//             value={email}
//             type="email"
//             onChange={(e) => setEmail(e.target.value)}
//             size="large"
//           />
//           <p className="text-xs mt-2 text-gray-500">
//             {isError ? (
//               <span className="text-red-500">Invalid email</span>
//             ) : (
//               'If you want to get notifications about this exchange.'
//             )}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default function ExchangeScreen() {
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <ExchangeTransfer />
//     </Suspense>
//   );
// }
