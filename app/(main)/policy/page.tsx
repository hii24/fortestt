import React from 'react';
import styles from './styles.module.css';

const Page = () => {
  return (
    <div className={styles.aml}>
      <div className={styles.documentStart}>
        <p>AML/KYC Policy</p>
        <span>Last Updated: February 28, 2025</span>
      </div>

      <div className={styles.firstSection}>
        <h1>Introduction</h1>
        <div className={styles.kycCompliance}>
          <p>
            Lizex.io adheres to the &#34;Know Your Customer&#34; (KYC) policy to ensure the security of crypto
            exchanges and comply with regulatory requirements. If your proposed transaction is flagged by our
            internal control system or the control system of our exchange partners, Lizex.io reserves the
            right to cancel the operation and refund the funds, deducting any applicable fees.
          </p>
          <p>
            The goal of the AML/KYC policy is to prevent the use of Lizex.io (intentionally or
            unintentionally) by criminal elements for money laundering purposes. The policy also includes
            measures to identify customers and beneficial account owners, determine the source of funds,
            assess the nature of their activities, and evaluate the reasonableness of transactions in the
            context of their business. This helps us effectively manage risks and ensure transaction
            transparency.
          </p>
          <p>
            We are committed to protecting our clients from fraudulent activities in the crypto asset space.
            The policy aims to detect illegally obtained funds and prevent the platform from being used for
            illicit purposes. To combat money laundering and related risks, relevant regulatory measures and
            modern software solutions are used to track suspicious transactions in real time.
          </p>
          <p>
            The AML/KYC policy, procedures, and internal controls are regularly reviewed and updated to comply
            with evolving legal requirements and the specifics of our business.
          </p>
        </div>
        <div className={styles.hrAndNumber}>
          <hr />
          <span>01</span>
        </div>
      </div>

      <div className={styles.firstSection}>
        <h1>Customer Identification Procedure</h1>
        <div className={styles.kycCompliance}>
          <h2>1.1 Identification</h2>
          <p>
            If the risk assessment system identifies a transaction as suspicious, it may be suspended. In such
            cases, Lizex.io may request the following information from clients:
          </p>
          <ul>
            <li>Full name;</li>
            <li>Date of birth (for individuals);</li>
            <li>Residential or primary business address;</li>
            <li>
              For individuals – a government-issued identification document with a photograph (passport,
              driver’s license, etc.);
            </li>
            <li>
              For legal entities – documents confirming the existence of the organization (articles of
              incorporation, business license, etc.).
            </li>
          </ul>

          <h2>1.2 Providing Incorrect Information</h2>
          <p>
            Clients must provide accurate, complete, and up-to-date information. If discrepancies are found,
            Lizex.io reserves the right to request corrections, and in the absence of a response, suspend or
            terminate services.
          </p>

          <h2>1.3 Information Verification</h2>
          <p>
            To prevent financial crimes, Lizex.io applies a risk-based approach to verifying the authenticity
            of customer information. The company evaluates the logical consistency of the provided data, its
            accuracy, and whether the client appears on any sanction lists. In some cases, transactions may be
            suspended until verification is completed.
          </p>

          <h2>1.4 Insufficient Information</h2>
          <p>
            If the provided data does not allow for reliable customer identification, Lizex.io may request
            additional information.
          </p>

          <h2>1.5 Customer Notification</h2>
          <p>
            Clients are informed that their transactions may be subject to AML/KYC checks. This information is
            detailed in the Terms of Use, which users must review before engaging with the platform.
          </p>
        </div>
        <div className={styles.hrAndNumber}>
          <hr />
          <span>02</span>
        </div>
      </div>

      <div className={styles.firstSection}>
        <h1>AML Compliance Officer</h1>
        <div className={styles.kycCompliance}>
          <p>
            The AML Compliance Officer is an authorized representative of Lizex.io responsible for
            implementing, monitoring, and ensuring compliance with the provisions of this document. This
            individual oversees anti-money laundering and counter-terrorism financing measures. Any suspicious
            activity should be reported through Lizex.io&#39;s official support channels.
          </p>
        </div>
        <div className={styles.hrAndNumber}>
          <hr />
          <span>03</span>
        </div>
      </div>

      <div className={styles.firstSection}>
        <h1>Transaction Monitoring</h1>
        <div className={styles.kycCompliance}>
          <p>
            Continuous monitoring is a key element of an effective KYC system. Lizex.io analyzes customer
            financial activity to identify deviations from the normal transaction pattern.
          </p>
        </div>
        <div className={styles.hrAndNumber}>
          <hr />
          <span>04</span>
        </div>
      </div>

      <div className={styles.firstSection}>
        <h1>Risk Management</h1>
        <div className={styles.kycCompliance}>
          <p>Lizex.io implements effective KYC compliance procedures, including:</p>
          <ul>
            <li>Management oversight;</li>
            <li>Adequate internal procedures;</li>
            <li>Segregation of duties;</li>
            <li>Employee training;</li>
            <li>Periodic audits and AML policy compliance checks.</li>
          </ul>
          <p>
            The Lizex.io security department conducts regular audits to ensure compliance with internal
            standards and legal requirements.
          </p>
        </div>
        <div className={styles.hrAndNumber}>
          <hr />
          <span>05</span>
        </div>
      </div>

      <div className={styles.firstSection}>
        <h1>Cooperation with Law Enforcement Agencies</h1>
        <div className={styles.kycCompliance}>
          <p>
            When necessary, Lizex.io may request and provide competent authorities with information about
            senders and recipients of virtual assets in response to official requests.
          </p>
        </div>
        <div className={styles.hrAndNumber}>
          <hr />
          <span>06</span>
        </div>
      </div>
    </div>
  );
};

export default Page;
