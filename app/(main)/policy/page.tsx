import React from 'react';
import styles from './styles.module.css';

const Page = () => {
  return (
    <div className={styles.aml}>
      <div className={styles.documentStart}>
        <p>Lizex.io AML/KYC Policy</p>
        <span>Last Updated: April 26, 2025</span>
      </div>

      <div className={styles.firstSection}>
        <h1>1. General Principles</h1>
        <div className={styles.kycCompliance}>
          <p>
            Lizex.io is committed to maintaining a secure environment while respecting the privacy of its users.
            Standard use of the platform does not require registration or identity verification. However,
            Lizex.io reserves the right to apply Anti-Money Laundering (AML) and Know Your Customer (KYC)
            procedures in specific high-risk circumstances.
          </p>
        </div>
        <div className={styles.hrAndNumber}>
          <hr />
          <span>01</span>
        </div>
      </div>

      <div className={styles.firstSection}>
        <h1>2. Triggers for AML/KYC Procedures</h1>
        <div className={styles.kycCompliance}>
          <p>AML/KYC checks may be initiated in the following situations:</p>
          <ul>
            <li>
              if a wallet address involved in the transaction appears on sanctions or blacklists (including public
              watchlists and compliance tools),
            </li>
            <li>upon a substantiated request from competent authorities or regulators,</li>
            <li>
              when a transaction is flagged during internal risk assessments related to fraud, terrorist financing,
              or asset tracing.
            </li>
          </ul>
        </div>
        <div className={styles.hrAndNumber}>
          <hr />
          <span>02</span>
        </div>
      </div>

      <div className={styles.firstSection}>
        <h1>3. User Responsibilities</h1>
        <div className={styles.kycCompliance}>
          <p>
            Upon request, users agree to provide accurate and complete information for additional verification
            procedures.
          </p>
        </div>
        <div className={styles.hrAndNumber}>
          <hr />
          <span>03</span>
        </div>
      </div>

      <div className={styles.firstSection}>
        <h1>4. Failure to Comply</h1>
        <div className={styles.kycCompliance}>
          <p>
            If a user refuses to provide requested information during an AML/KYC review, Lizex.io may suspend or
            cancel the transaction. In most cases, funds will be returned to the original sending address, except
            where prevented by legal, technical, or compliance restrictions. Network expenses incurred during this
            process may be withheld.
          </p>
        </div>
        <div className={styles.hrAndNumber}>
          <hr />
          <span>04</span>
        </div>
      </div>

      <div className={styles.firstSection}>
        <h1>5. Data Handling</h1>
        <div className={styles.kycCompliance}>
          <p>
            Any personal or transactional data collected during AML/KYC procedures will be processed securely and
            disclosed only when required by law or risk management obligations.
          </p>
        </div>
        <div className={styles.hrAndNumber}>
          <hr />
          <span>05</span>
        </div>
      </div>

      <div className={styles.firstSection}>
        <h1>6. Transaction Monitoring</h1>
        <div className={styles.kycCompliance}>
          <p>
            Lizex.io applies risk-based monitoring using automated systems and blockchain analytics. Suspicious
            activity — such as unusual transaction volume, frequency, links to compromised wallets, or involvement
            of addresses appearing on sanctions and blacklists — may be subject to further review.
          </p>
        </div>
        <div className={styles.hrAndNumber}>
          <hr />
          <span>06</span>
        </div>
      </div>

      <div className={styles.firstSection}>
        <h1>7. Right to Refuse Service</h1>
        <div className={styles.kycCompliance}>
          <p>
            Lizex.io reserves the right to deny service to any user who poses a compliance risk or appears to be
            engaged in prohibited or unlawful activity, without obligation to provide prior notice or justification.
          </p>
        </div>
        <div className={styles.hrAndNumber}>
          <hr />
          <span>07</span>
        </div>
      </div>

      <div className={styles.firstSection}>
        <h1>8. Contact</h1>
        <div className={styles.kycCompliance}>
          <p>
            For questions regarding AML/KYC procedures, please contact our compliance team:
            <a href="mailto:support@lizex.io"> support@lizex.io</a>
          </p>
        </div>
        <div className={styles.hrAndNumber}>
          <hr />
          <span>08</span>
        </div>
      </div>
    </div>
  );
};

export default Page;
