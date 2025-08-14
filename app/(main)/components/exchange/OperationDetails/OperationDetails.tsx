import { FC } from 'react';
import { useTranslations } from 'next-intl';
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

const LabelInput = ({ title, value = '' }: { title: string; value?: string }) => {
  const t = useTranslations('exchange.operationDetails');
  return (
    <div className="w-full">
      <p className="text-gray-700 mb-2 text-sm font-medium">{title || t('setLabel')}</p>
      <CopiedInput
        readOnly
        value={value}
        placeholder={t('recipientAddress')}
        copyTooltipIcon="/icons/copy.svg"
        copyTooltipTitle={t('copyTooltipTitle')}
        copyTooltipAlt={t('copyTooltipAlt')}
        suffix={<AddressLink />}
      />
    </div>
  );
};

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
  const t = useTranslations('exchange.operationDetails');
  return (
    <div className={`${className} w-full `}>
      <div className="w-full flex flex-col gap-8">
        {showTitle && <h4 className={styles.title}>{t('title')}</h4>}
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
            {tokenAmount && (
              <span className={styles.amountText}>{tokenAmount}</span>
            )}
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
        {!!recipientAdrress && <LabelInput title={t('recipientAddress')} value={recipientAdrress ?? ''} />}
        {!!depositeAdrress && <LabelInput title={t('depositAddress')} value={depositeAdrress ?? ''} />}
        {!!hashIn && <LabelInput title={t('hashIn')} value={hashIn ?? ''} />}
        {!!hashOut && <LabelInput title={t('hashOut')} value={hashOut ?? ''} />}
      </div>
    </div>
  );
};
