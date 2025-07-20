import React from 'react';
import styles from './styles.module.css';

const Page = () => {
  return (
    <div style={{ backgroundColor: '#F5F0F0' }} className={styles.aml + ' pageContainer'}>
      <div className={styles.documentStart}>
        <p>Privacy Policy</p>
        <span>Last updated: [insert date]</span>
      </div>

      <div className={styles.firstSection}>
        <div className={styles.firstSection}>
          <h1>Introduction</h1>
          <div className={styles.kycCompliance}>
            This Privacy Policy describes how Lizex.io collects, uses, processes, and discloses information
            obtained from users (“Users”) of the Lizex.io website (“Site”). This policy applies to the Site
            and all products and services offered by Lizex.io.
          </div>
          <div className={styles.hrAndNumber}>
            <hr />
            <span>01</span>
          </div>
        </div>
        <h1>Personal Identification Information</h1>
        <div className={styles.kycCompliance}>
          <p>
            We may collect personal identification information from Users in several ways, including when
            Users:
          </p>
          <ul>
            <li>Visit our Site</li>
            <li>Interact with our services or features</li>
            <li>Voluntarily provide information, such as an email address or other details</li>
          </ul>
          <p>
            Users can visit our Site anonymously. We collect personal information only if it is voluntarily
            provided. However, refusing to provide certain information may limit access to specific features
            of the Site.
          </p>
        </div>
        <div className={styles.hrAndNumber}>
          <hr />
          <span>02</span>
        </div>
      </div>

      <div className={styles.firstSection}>
        <h1>Non-Personal Identification Information</h1>
        <div className={styles.kycCompliance}>
          <p>
            We may collect non-personal identification information whenever Users interact with our Site. This
            may include:
          </p>
          <ul>
            <li>Browser type</li>
            <li>Device information</li>
            <li>Operating system</li>
            <li>Technical connection details (such as Internet service provider)</li>
          </ul>
        </div>
        <div className={styles.hrAndNumber}>
          <hr />
          <span>03</span>
        </div>
      </div>

      <div className={styles.firstSection}>
        <h1>Use of Cookies</h1>
        <div className={styles.kycCompliance}>
          <p>
            Our Site may use cookies to enhance the user experience. A User’s web browser may store cookies
            for record-keeping and tracking purposes.
          </p>
          <p>
            Users can configure their browser to refuse cookies or receive notifications when cookies are
            being used. However, disabling cookies may cause some parts of the Site to malfunction.
          </p>
        </div>
        <div className={styles.hrAndNumber}>
          <hr />
          <span>04</span>
        </div>
      </div>

      <div className={styles.firstSection}>
        <h1>How We Use Collected Information</h1>
        <div className={styles.kycCompliance}>
          <p>Lizex.io may use collected personal information for the following purposes:</p>
          <ul>
            <li>
              <strong>To improve customer service:</strong> Helps us respond efficiently to requests and
              support needs.
            </li>
            <li>
              <strong>To enhance the Site:</strong> We may use user feedback to improve services.
            </li>
            <li>
              <strong>To process payments:</strong> User-provided information is used solely to complete
              transactions. Data is not shared with third parties except as required for service fulfillment.
            </li>
            <li>
              <strong>To send updates and notifications:</strong> Email addresses may be used to send updates
              regarding orders or inquiries.
            </li>
          </ul>
        </div>
        <div className={styles.hrAndNumber}>
          <hr />
          <span>05</span>
        </div>
      </div>

      <div className={styles.firstSection}>
        <h1>Data Protection</h1>
        <div className={styles.kycCompliance}>
          <p>
            We implement appropriate data collection, storage, and processing practices, along with security
            measures, to protect against unauthorized access, alteration, disclosure, or destruction of your
            personal information.
          </p>
          <p>
            All confidential data exchanged between the Site and Users occurs via a secure SSL-encrypted
            communication channel with digital signature protection.
          </p>
        </div>
        <div className={styles.hrAndNumber}>
          <hr />
          <span>06</span>
        </div>
      </div>

      <div className={styles.firstSection}>
        <h1>Sharing Personal Information</h1>
        <div className={styles.kycCompliance}>
          <p>We do not sell, trade, or transfer Users’ personal information to third parties.</p>
          <p>
            However, we may share aggregated demographic data, which does not contain personal identification
            information, with business partners, trusted affiliates, and advertisers for the purposes
            mentioned above.
          </p>
        </div>
        <div className={styles.hrAndNumber}>
          <hr />
          <span>07</span>
        </div>
      </div>

      <div className={styles.firstSection}>
        <h1>Third-Party Websites</h1>
        <div className={styles.kycCompliance}>
          <p>
            Our Site may contain advertisements or content linking to third-party websites, services, or
            businesses.
          </p>
          <p>
            We do not control the content and privacy policies of these external sites. Users interacting with
            third-party websites are subject to their own terms and privacy policies.
          </p>
        </div>
        <div className={styles.hrAndNumber}>
          <hr />
          <span>08</span>
        </div>
      </div>

      <div className={styles.firstSection}>
        <h1>Changes to This Privacy Policy</h1>
        <div className={styles.kycCompliance}>
          <p>
            Lizex.io reserves the right to update this Privacy Policy at any time. Changes will be reflected
            in the “Last Updated” date at the top of this page.
          </p>
          <p>
            Users are encouraged to regularly review this page to stay informed about how we protect collected
            personal information.
          </p>
          <p>
            If changes to this Privacy Policy significantly affect how we use personal data, we will notify
            Users via email or post a notice on the Site. Continued use of the Site after such changes
            constitutes acceptance of the updated policy.
          </p>
        </div>
        <div className={styles.hrAndNumber}>
          <hr />
          <span>09</span>
        </div>
      </div>

      <div className={styles.firstSection}>
        <h1>Acceptance of These Terms</h1>
        <div className={styles.kycCompliance}>
          <p>
            By using this Site, you agree to this Privacy Policy and our Terms of Use. If you do not agree,
            please discontinue using the Site.
          </p>
          <p>
            For any questions, please contact us at: <strong>support@lizex.io</strong>
          </p>
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
