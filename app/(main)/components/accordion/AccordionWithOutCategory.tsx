'use client';
import { useState } from 'react';
import styles from './styles.module.css';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface FAQItem {
  question: string;
  answer: string;
}

const AccordionWithOutCategory = () => {
  const t = useTranslations('accordionSimple');
  const faqData: FAQItem[] = [
    { question: t('q1.title'), answer: t('q1.answer') },
    { question: t('q2.title'), answer: t('q2.answer') },
    { question: t('q3.title'), answer: t('q3.answer') },
  ];
  const [openStates, setOpenStates] = useState<boolean[]>(Array(faqData.length).fill(false));

  const toggleAccordion = (index: number) => {
    setOpenStates((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  return (
    <div className={styles.accordionContainerWithout}>
      <div className={styles.subContainer}>
        <div className={styles.accContainerWithout}>
          {faqData.map((item, index) => (
            <div key={index} className={styles.accordionItem}>
              <button
                className={styles.accordionHeader}
                onClick={() => {
                  toggleAccordion(index);
                }}>
                {item.question}
                <span className={`${styles.icon} ${openStates[index] ? styles.rotate : ''}`}>
                  <Image src="/icons/up.svg" alt="arrow" width={24} height={24} />
                </span>
              </button>
              <div className={`${styles.accordionContent} ${openStates[index] ? styles.open : styles.close}`}>
                <p>{item.answer || 'The answer will appear soon'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccordionWithOutCategory;
