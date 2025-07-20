import React from 'react';
import styles from './styles.module.css';
import Accordion from '@/app/(main)/components/accordion/Accordion';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: 'How does Lizex work?',
    answer:
      'The Lizex trading system is integrated with the largest cryptocurrency exchanges. There is no deposit storage, and only instant coin exchanges are available on our platform. This allows us to quickly find the most profitable exchange rates for our customers in a very short time.',
  },
  {
    question: 'Do I need to create an account or register?',
    answer:
      'No, Lizex is a fully anonymous platform as our team is committed to maintaining anonymity in the cryptocurrency world. We do not require any personal data to complete an exchange.',
  },
  {
    question: 'What is Exchange ID?',
    answer:
      'Exchange ID is a unique identifier for your transaction, consisting of alphanumeric characters. It allows you to track the details of your exchange and follow its progress. When contacting our support team, it is recommended to provide the Exchange ID to help speed up the process of locating your exchange in our database.',
  },
  {
    question: 'What is a transaction hash?',
    answer:
      'A transaction hash is a unique identifier assigned to every new transaction in the blockchain. This hash is linked to the specific operation and will be included in all subsequent blocks. With the transaction hash, you can view the details of your transaction on the network. It is typically displayed as "tx ID" in your wallet.',
  },
  // {
  //     question: "What is a transaction hash?",
  //     answer:
  //         "A transaction hash is a unique identifier given to each new transaction on the blockchain. It is associated with a specific operation and will be recorded in all following blocks. Using the transaction hash, you can view the details of your transaction within the network. This ID is usually displayed as \"tx ID\" in your wallet.",
  // },
];

const Page = () => {
  return (
    <div className={`${styles.container} container pageContainer`}>
      <div className={styles.faq}>
        <h1 className={styles.faqMainText}>Frequently asked brquestions</h1>
        <h3 className={styles.faqDescriptionText}>
          Here are answers to common questions. For <br />
          more information, please contact us.
        </h3>
      </div>
      <div className={styles.AccordionWithCategory}>
        <Accordion></Accordion>
      </div>
      <div className={styles.cards}>
        {faqData.map((item, index) => (
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
