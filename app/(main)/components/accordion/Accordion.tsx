'use client';
import { useMemo, useState } from 'react';
import styles from './styles.module.css';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface FAQItem {
  question: string;
  answerKey: string;
}

interface Category {
  name: string;
  faqs: FAQItem[];
}

// Build categories from translations at runtime
const useFaqCategories = (): Category[] => {
  const t = useTranslations('accordion');
  return useMemo(
    () => [
      {
        name: t('about'),
        faqs: [
          { question: t('about_q1.title'), answerKey: 'about_q1.answer' },
          { question: t('about_q2.title'), answerKey: 'about_q2.answer' },
          { question: t('about_q3.title'), answerKey: 'about_q3.answer' },
          { question: t('about_q4.title'), answerKey: 'about_q4.answer' },
          { question: t('about_q5.title'), answerKey: 'about_q5.answer' },
        ],
      },
      {
        name: t('support'),
        faqs: [
          { question: t('support_q1.title'), answerKey: 'support_q1.answer' },
          { question: t('support_q2.title'), answerKey: 'support_q2.answer' },
          { question: t('support_q3.title'), answerKey: 'support_q3.answer' },
          { question: t('support_q4.title'), answerKey: 'support_q4.answer' },
          { question: t('support_q5.title'), answerKey: 'support_q5.answer' },
          { question: t('support_q6.title'), answerKey: 'support_q6.answer' },
        ],
      },
      {
        name: t('transaction'),
        faqs: [
          { question: t('tx_q1.title'), answerKey: 'tx_q1.answer' },
          { question: t('tx_q2.title'), answerKey: 'tx_q2.answer' },
          { question: t('tx_q3.title'), answerKey: 'tx_q3.answer' },
        ],
      },
    ],
    [t]
  );
};

const Accordion = () => {
  const categories = useFaqCategories();
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  const [openStates, setOpenStates] = useState<boolean[][]>(
    categories.map((cat) => Array(cat.faqs.length).fill(false))
  );

  const toggleAccordion = (catIndex: number, faqIndex: number) => {
    setOpenStates((prev) => {
      const updated = [...prev];
      updated[catIndex] = [...updated[catIndex]];
      updated[catIndex][faqIndex] = !updated[catIndex][faqIndex];
      return updated;
    });
  };

  const t = useTranslations('accordion');
  return (
    <div className={styles.accordionContainer}>
      <div className={styles.subContainer}>
        <div className={styles.blockAccordion}>
          {categories.map((cat, catIndex) => (
            <p
              key={catIndex}
              onClick={() => {
                setActiveCategoryIndex(catIndex);
              }}
              className={activeCategoryIndex === catIndex ? styles.active : ''}>
              {cat.name}
            </p>
          ))}
        </div>

        <div className={styles.accContainer}>
          {categories[activeCategoryIndex].faqs.map((faq, faqIndex) => (
            <div key={faqIndex} className={styles.accordionItem}>
              <button
                className={styles.accordionHeader}
                onClick={() => {
                  toggleAccordion(activeCategoryIndex, faqIndex);
                }}>
                {faq.question}
                <span
                  className={`${styles.icon} ${
                    openStates[activeCategoryIndex][faqIndex] ? styles.rotate : ''
                  }`}>
                  <Image src="/icons/up.svg" alt="arrow" width={24} height={24} />
                </span>
              </button>

              <div
                className={`${styles.accordionContent} ${
                  openStates[activeCategoryIndex][faqIndex] ? styles.open : styles.close
                }`}>
                <div>
                  {t.rich(faq.answerKey as any, {
                    p: (chunks) => <p>{chunks}</p>,
                    ul: (chunks) => <ul>{chunks}</ul>,
                    li: (chunks) => <li>{chunks}</li>,
                    strong: (chunks) => <strong>{chunks}</strong>,
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
