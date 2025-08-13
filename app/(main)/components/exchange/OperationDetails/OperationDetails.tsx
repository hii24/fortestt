import { FC } from 'react';
import { CurrencyView } from '../CurrencyView/CurrencyView';
import styles from './styles.module.css';
import { CopiedInput } from '@/app/components/CopiedInput/CopiedInput';
import { AddressLink } from '@/app/components/AddressLink/AddressLink';
import CurrencyButton from '../swap-selector/ui/currency-selector/ui/currency-button/currency-button';

interface OperationDetailsProps {
  className?: string;
  tokenAmount: string;
  currencyName?: string;
  networkSymbol: string;
  currencySymbol: string;
  showTitle?: boolean;
  description?: string;
  hashIn?: string;
  hashOut?: string;
  recipientAdrress?: string;
  depositeAdrress?: string;
}

const LabelInput = ({ title = 'Set Label', value = '' }) => (
  <div className="w-full">
    <p className="text-gray-700 mb-2 text-sm font-medium">{title}</p>

    <CopiedInput
      readOnly
      value={value}
      placeholder="Enter the recipient's address"
      copyTooltipIcon="/icons/copy.svg"
      copyTooltipTitle="Your address"
      copyTooltipAlt="Address"
      suffix={<AddressLink />}
    />
  </div>
);

export const OperationDetails: FC<OperationDetailsProps> = ({
  recipientAdrress,
  tokenAmount,
  currencySymbol,
  currencyName,
  networkSymbol,
  depositeAdrress,
  hashIn,
  hashOut,
  className = '',
  showTitle = false,
  description = '',
}) => {
  return (
    <div className={`${className} w-full `}>
      <div className="w-full flex flex-col gap-8">
        {showTitle && <h4 className={styles.title}>Operation details</h4>}
        <div className="flex gap-1 items-center w-full">
          <div className="flex gap-4 items-center">
            <p className={styles.amountText}>{description}</p>
            <CurrencyButton
                  currencyToken={currencySymbol ?? ''}
                  currencyTitle={currencyName ?? ''}
                  networkTitle={networkSymbol ?? ''}
                  opened={false}
                  onClick={() => {}}
                  showArrow={false}
                />
            {/* <CurrencyView
              currency={{
                symbol: currencySymbol ?? '',
                value: `${tokenAmount}`,
                network: networkSymbol ?? '',
                name: currencyName ?? '',
              }}
            /> */}
          </div>
        </div>
        {!!recipientAdrress && <LabelInput title="Recipient address:" value={recipientAdrress ?? ''} />}
        {!!depositeAdrress && <LabelInput title="Deposit address:" value={depositeAdrress ?? ''} />}
        {!!hashIn && <LabelInput title="Hash in:" value={hashIn ?? ''} />}
        {!!hashOut && <LabelInput title="Hash out:" value={hashOut ?? ''} />}
      </div>
    </div>
  );
};
