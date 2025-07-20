import Image from 'next/image';
import styles from './styles.module.css';
import Link from 'next/link';

export const Logo = ({ className = '' }) => {
  return (
    <div className={`${styles.logoSection} ${className ?? ''}`}>
      <Link href="/" className={'max-w-[75px] md:max-w-[93px]'}>
        <Image src="/icons/logo.svg" fill alt="logo" className={'object-contain !relative'} />
      </Link>
    </div>
  );
};
