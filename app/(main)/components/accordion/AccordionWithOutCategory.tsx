'use client';
import { useState } from 'react';
import styles from './styles.module.css';
import Image from 'next/image';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: 'What is Lizex?',
    answer:
      'Lizex is an innovative cryptocurrency exchange platform that provides fast, secure and anonymous transactions.',
  },
  {
    question: 'Why trust us?',
    answer:
      'Lizex is an innovative cryptocurrency exchange platform that provides fast, secure and anonymous transactions.',
  },
  {
    question: 'Do I need to create an account or register?',
    answer:
      'Lizex is an innovative cryptocurrency exchange platform that provides fast, secure and anonymous transactions.',
  },
];

const AccordionWithOutCategory = () => {
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
