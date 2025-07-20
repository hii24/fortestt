'use client';
import { useState } from 'react';
import styles from './styles.module.css';
import Image from 'next/image';

interface FAQItem {
  question: string;
  answer: string;
}

interface Category {
  name: string;
  faqs: FAQItem[];
}

const faqCategories: Category[] = [
  {
    name: 'About Us',
    faqs: [
      {
        question: 'What is Lizex.io?',
        answer:
          '<p>Lizex.io is a service for fast, anonymous, and secure cryptocurrency exchange. We offer users competitive rates, instant transactions, and a user-friendly interface without the need for registration.</p>',
      },
      {
        question: 'Why choose Lizex.io?',
        answer:
          '<p>Lizex.io provides users with a convenient, secure, and fast way to exchange cryptocurrencies. Our service operates without mandatory KYC, ensuring anonymity and no registration requirements. We offer competitive rates with no hidden fees, and exchanges are completed within an average of 5–30 minutes. All transactions are secured with advanced encryption technologies, and our 24/7 support helps resolve any issues. The interface is intuitive, even for beginners, and there are no maximum limits on exchange amounts.</p>',
      },
      {
        question: 'What cryptocurrencies does Lizex.io support?',
        answer:
          '<p>Our service supports popular cryptocurrencies, including Bitcoin (BTC), Ethereum (ETH), USDT, Litecoin (LTC), Ripple (XRP), and many others. The full list is available on the website’s main page.</p>',
      },
      {
        question: 'Do I need to complete identity verification (KYC)?',
        answer:
          '<p>No, KYC verification is not mandatory. We value user privacy and do not request personal data for standard transactions.</p>',
      },
      {
        question: 'Where can I find news and updates about Lizex.io?',
        answer:
          '<p>Updates can be found on our website and in our social media channels. Follow us to stay informed about new features and opportunities.</p>',
      },
    ],
  },
  {
    name: 'Support',
    faqs: [
      {
        question: 'How can I contact customer support?',
        answer:
          '<p>You can reach our support team through:</p><ul><li>Live chat on our website.</li><li>Email: support@lizex.io</li><li>Telegram: Link available on the website.</li></ul>',
      },
      {
        question: 'How long does it take to receive a response from support?',
        answer:
          "<p>We aim to respond within a few minutes. In rare cases, response times may extend to a few hours, depending on the team's workload.</p><p>The average exchange processing time is up to 10 minutes, but speed depends on blockchain network congestion.</p>",
      },
      {
        question: 'What should I do if I accidentally sent the wrong amount?',
        answer:
          '<p>If you sent an amount that differs from the one specified in the order, immediately contact our support team, providing your order ID. We will do our best to assist you.</p>',
      },
      {
        question: 'Why is my transaction delayed?',
        answer:
          '<p>Possible reasons:</p><ul><li>Blockchain congestion – high network activity can cause delays.</li><li>Low network fee – if the network is busy, transactions with lower fees may take longer to confirm.</li><li>Incorrect details – check that the entered information is accurate.</li></ul><p>If more than 30 minutes have passed, contact support.</p>',
      },
      {
        question: 'Can I cancel an exchange?',
        answer:
          '<p>No, once the funds have been sent, the transaction cannot be canceled, as blockchain transactions are irreversible.</p>',
      },
      {
        question: 'What should I do if I entered the wrong recipient address?',
        answer:
          "<p>If the funds have already been sent, they cannot be recovered. Blockchain transactions cannot be reversed.</p><p>Always double-check your details before confirming.</p><p>If an error occurs, try reaching out to the recipient (if it's an exchange or service).</p>",
      },
    ],
  },
  {
    name: 'Transaction',
    faqs: [
      {
        question: 'What fees does Lizex.io charge?',
        answer:
          '<ul><li><strong>Service fee:</strong> Already included in the exchange rate.</li><li><strong>Network fee:</strong> Charged by the cryptocurrency network and depends on its current congestion.</li></ul>',
      },
      {
        question: 'How can I track my transaction status?',
        answer:
          '<ul><li>Use <strong>Swap Tracker</strong> on the Lizex.io website – enter your order ID and monitor its status.</li><li>Check the transaction in the <strong>blockchain explorer</strong> using its TxID (transaction ID).</li></ul><p>If more than 30 minutes have passed, contact support.</p>',
      },
      {
        question: 'What are fixed (Fixed) and floating (Float) rates?',
        answer:
          '<p>When exchanging cryptocurrency on Lizex.io, you can choose between two exchange rate options:</p><p><strong>Fixed rate:</strong> This type of exchange locks in the exchange rate at the moment the order is created. Regardless of market fluctuations during the exchange process, you will receive the exact amount displayed at the time of order creation. This is useful for high-volatility cryptocurrencies. However, to secure the rate, you must send the funds within the specified time frame after placing the order.</p><p><strong>Floating rate:</strong> This exchange type is based on the current market rate and may change during the transaction. If the market rate increases in your favor, you will receive more cryptocurrency. If the rate decreases, the final amount will be lower.</p>',
      },
    ],
  },
];

const Accordion = () => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  const [openStates, setOpenStates] = useState<boolean[][]>(
    faqCategories.map((cat) => Array(cat.faqs.length).fill(false))
  );

  const toggleAccordion = (catIndex: number, faqIndex: number) => {
    setOpenStates((prev) => {
      const updated = [...prev];
      updated[catIndex] = [...updated[catIndex]];
      updated[catIndex][faqIndex] = !updated[catIndex][faqIndex];
      return updated;
    });
  };

  return (
    <div className={styles.accordionContainer}>
      <div className={styles.subContainer}>
        <div className={styles.blockAccordion}>
          {faqCategories.map((cat, catIndex) => (
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
          {faqCategories[activeCategoryIndex].faqs.map((faq, faqIndex) => (
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
                <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
