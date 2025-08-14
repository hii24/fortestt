import React from 'react';
import styles from './styles.module.css';
import Accordion from '@/app/(main)/components/accordion/Accordion';
import { getTranslations } from 'next-intl/server';

interface FAQItem {
  question: string;
  answer: string;
}

// Items will be provided from translations

const Page = async () => {
  const t = await getTranslations('faqPage');
  const faqItems: FAQItem[] = [
    { question: t('items.0.question'), answer: t('items.0.answer') },
    { question: t('items.1.question'), answer: t('items.1.answer') },
    { question: t('items.2.question'), answer: t('items.2.answer') },
    { question: t('items.3.question'), answer: t('items.3.answer') },
  ];
  return (
    <div className={`${styles.container} container pageContainer`}>
      <div className={styles.faq}>
        <h1 className={styles.faqMainText}>{t('title')}</h1>
        <h3 className={styles.faqDescriptionText}>{t('desc')}</h3>
      </div>
      <div className={styles.AccordionWithCategory}>
        <Accordion></Accordion>
      </div>
      <div className={styles.cards}>
        {faqItems.map((item, index) => (
          <div key={index} className={styles.faqCard}>
            <h3 className={styles.faqQuestion}>{item.question}</h3>
            <p className={styles.faqAnswer}>{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
