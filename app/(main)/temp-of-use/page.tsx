import React from 'react';
import styles from './styles.module.css';

const Page = () => {
  return (
    <div className={styles.aml + ' pageContainer'}>
      <div className={styles.documentStart}>
        <p>Terms of Use</p>
        <span>Last Updated: [Insert Date]</span>
      </div>

      <div className={styles.firstSection}>
        <h1>General Provisions</h1>
        <div className={styles.kycCompliance}>
          <p>
            Welcome to Lizex.io! This Terms of Use agreement (hereinafter referred to as the “Agreement”)
            governs the relationship between you (hereinafter referred to as the “User”) and Lizex.io
            regarding access to the website and the use of its services.
          </p>
          <p>
            By using this website, you confirm your agreement to the terms of this Agreement and the Privacy
            Policy. If you do not agree with these terms, please stop using the service.
          </p>
          <ul>
            <li>
              <strong>Effective Date:</strong> This Agreement takes effect from the moment the User starts
              using the Lizex.io website.
            </li>
            <li>
              <strong>Terminology:</strong>
              <ul>
                <li>“Lizex.io” — A web platform providing cryptocurrency exchange services.</li>
                <li>“User” — Any individual using the website and its services.</li>
                <li>
                  “Crypto Assets” or “Cryptocurrency” — Digital assets, including Bitcoin, Ethereum, and
                  others.
                </li>
              </ul>
            </li>
            <li>
              <strong>Acceptance of Terms:</strong> By using the website, the User agrees to comply with the
              terms of this Agreement and the Privacy Policy.
            </li>
          </ul>
        </div>
        <div className={styles.hrAndNumber}>
          <hr />
          <span>1</span>
        </div>
      </div>

      <div className={styles.firstSection}>
        <h1>Personal Information</h1>
        <div className={styles.kycCompliance}>
          <p>
            By using the services of Lizex.io, the User agrees that the platform may process, store, and
            transfer their personal data outside their jurisdiction in accordance with applicable data
            protection laws.
          </p>
          <p>
            Lizex.io takes measures to protect the confidentiality of data; however, the User acknowledges
            that transmitting information over the internet is not always completely secure and uses the
            service at their own risk.
          </p>
        </div>
        <div className={styles.hrAndNumber}>
          <hr />
          <span>2</span>
        </div>
      </div>

      <div className={styles.firstSection}>
        <h1>Access Restriction</h1>
        <div className={styles.kycCompliance}>
          <p>
            Lizex.io reserves the right to unilaterally suspend or terminate a User’s access to the service
            without prior notice if:
          </p>
          <ul>
            <li>Suspicious or illegal transactions are detected.</li>
            <li>The User has violated the terms of this Agreement.</li>
            <li>A blocking request has been received from law enforcement or regulatory authorities.</li>
          </ul>
          <p>If an account is blocked, the User may contact customer support for clarification.</p>
        </div>
        <div className={styles.hrAndNumber}>
          <hr />
          <span>3</span>
        </div>
      </div>

      <div className={styles.firstSection}>
        <h1>Refund Policy</h1>
        <div className={styles.kycCompliance}>
          <ul>
            <li>
              All transactions are final. Lizex.io is not responsible for incorrectly entered addresses or
              transactions made on phishing sites.
            </li>
            <li>
              Refunds may be granted in exceptional cases, but processing may take up to 14 business days.
            </li>
            <li>In the event of a refund, all incurred fees will be deducted from the returned amount.</li>
          </ul>
        </div>
        <div className={styles.hrAndNumber}>
          <hr />
          <span>4</span>
        </div>
      </div>

      <div className={styles.firstSection}>
        <h1>Limitation of Liability</h1>
        <div className={styles.kycCompliance}>
          <ul>
            <li>
              Lizex.io is not responsible for any financial losses, direct or indirect damages, incurred as a
              result of using the website.
            </li>
            <li>
              The service is provided “as is” and “as available” with no guarantees of functionality or
              uninterrupted service.
            </li>
            <li>
              The company is not liable for blockchain malfunctions, network delays, or force majeure events.
            </li>
          </ul>
          <p>The User agrees to use the platform at their own risk.</p>
        </div>
        <div className={styles.hrAndNumber}>
          <hr />
          <span>5</span>
        </div>
      </div>

      <div className={styles.firstSection}>
        <h1>Exchange Rates and Fees</h1>
        <div className={styles.kycCompliance}>
          <ul>
            <li>All exchange rates displayed on the website already include Lizex.io’s fees.</li>
            <li>No additional fees are charged unless explicitly stated.</li>
            <li>Exchange rates are dynamic and may change depending on market conditions.</li>
          </ul>
        </div>
        <div className={styles.hrAndNumber}>
          <hr />
          <span>6</span>
        </div>
      </div>

      <div className={styles.firstSection}>
        <h1>Intellectual Property</h1>
        <div className={styles.kycCompliance}>
          <ul>
            <li>
              All information, logos, source code, and content on the website are the intellectual property of
              Lizex.io.
            </li>
            <li>Users do not acquire any rights to use the platform’s brand, logos, or software.</li>
          </ul>
          <p>Unauthorized use of the content is prohibited and may result in legal consequences.</p>
        </div>
        <div className={styles.hrAndNumber}>
          <hr />
          <span>7</span>
        </div>
      </div>

      <div className={styles.firstSection}>
        <h1>Website Changes</h1>
        <div className={styles.kycCompliance}>
          <p>
            Lizex.io reserves the right to modify, update, or temporarily suspend website operations without
            prior notice.
          </p>
          <p>
            The company is not responsible for any inconveniences caused by updates or technical malfunctions.
          </p>
        </div>
        <div className={styles.hrAndNumber}>
          <hr />
          <span>8</span>
        </div>
      </div>

      <div className={styles.firstSection}>
        <h1>Third-Party Links</h1>
        <div className={styles.kycCompliance}>
          <ul>
            <li>The website may contain links to external resources.</li>
            <li>
              Lizex.io is not responsible for the content of these websites or any consequences resulting from
              accessing them.
            </li>
            <li>Clicking on an external link terminates the contractual relationship with Lizex.io.</li>
          </ul>
        </div>
        <div className={styles.hrAndNumber}>
          <hr />
          <span>9</span>
        </div>
      </div>

      <div className={styles.firstSection}>
        <h1>Final Provisions</h1>
        <div className={styles.kycCompliance}>
          <ul>
            <li>
              Using the website does not create a partnership, agency, or any other type of legal relationship
              between the User and Lizex.io.
            </li>
            <li>
              If any provision of this Agreement is found to be invalid, this does not affect the validity of
              the remaining terms.
            </li>
            <li>
              The User is required to regularly review this Agreement, as it may change without prior notice.
            </li>
          </ul>
          <p>If you have any questions regarding this Agreement, please contact Lizex.io customer support.</p>
          <p>Thank you for using Lizex.io!</p>
        </div>
        <div className={styles.hrAndNumber}>
          <hr />
          <span>10</span>
        </div>
      </div>
    </div>
  );
};

export default Page;
