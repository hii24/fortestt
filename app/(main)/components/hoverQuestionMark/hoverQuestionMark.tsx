import React from 'react';
import styles from './styles.module.css';
import Image from 'next/image';
const HoverQuestionMark = () => {
  return (
    <div className={styles.block}>
      <div className="flex justify-center items-center">
        <Image src={'/icons/lock.svg'} alt={'lock'} height={22} width={22}></Image> <p>Floating rate</p>
      </div>
      <span>
        The rate is determined at the time the funds are received. Fee: 0.5% + network fee. The exchange is
        processed at the current market rate.
      </span>
    </div>
  );
};

export default HoverQuestionMark;
