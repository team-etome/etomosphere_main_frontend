import React from 'react';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import './privacy.css';

const sections = [
  {
    title: '2. Information We Collect',
    body: `We collect information reasonably necessary to provide our products and services, process transactions, communicate with customers and operate our business.

Information You Provide
Depending on how you interact with Etome, we may collect:
• Name
• Email address
• Telephone/mobile number
• Billing and delivery address
• Order and purchase details
• Information provided when contacting customer support
• Information provided for returns, cancellations, replacements or refunds
• School, organisation or business information for B2B transactions
• Payment-related information required to process a transaction
• Other information you voluntarily provide

Information Collected Automatically
When you use our website, certain technical information may be collected automatically, including:
• IP address
• Browser and device type
• Operating system
• Pages visited and website interactions
• Approximate location derived from technical information
• Referring website
• Date and time of access
• Technical information required for website security and performance

We may use cookies and similar technologies for website functionality, security, analytics and, where applicable, marketing.

Information from Third Parties
We may receive information from service providers involved in processing your order or payment, such as payment processors, logistics providers, technology providers or business partners.`,
  },
  {
    title: '3. How We Use Your Information',
    body: `We may use personal information to:
• Process and fulfil orders
• Arrange delivery
• Process payments and refunds
• Provide customer support
• Respond to enquiries
• Handle returns, cancellations and complaints
• Provide digital products, software or subscriptions
• Send important information relating to purchases or services
• Improve our website, products and services
• Detect and prevent fraud, misuse and security incidents
• Maintain accounting and transaction records
• Comply with legal and regulatory obligations
• Protect the rights, property and security of Etome and our customers
• Send promotional communications where permitted

We will not use personal information for materially different purposes without an appropriate legal basis or notice where required by applicable law.`,
  },
  {
    title: '4. Payments',
    body: `Payments through our website may be processed through HDFC's payment gateway or another payment service provider used by Etome.

Payment providers may collect and process payment information under their own privacy policies and security practices.

Etome does not ordinarily receive or store your complete card number, CVV, UPI PIN or other full payment credentials.

We may retain limited transaction information, such as payment status, transaction reference, amount and date, for order processing, accounting, customer support, refunds, fraud prevention and legal requirements.`,
  },
  {
    title: '5. Cookies and Similar Technologies',
    body: `Our website may use cookies and similar technologies to:
• Enable essential website functions
• Remember preferences
• Understand website usage
• Improve website performance
• Maintain security
• Support analytics or marketing activities where applicable

You may manage or disable certain cookies through your browser settings. Some website functions may not operate correctly if essential cookies are disabled.

As Etome introduces additional analytics, advertising or marketing technologies, this Privacy Policy may be updated where appropriate.`,
  },
  {
    title: '6. Sharing of Information',
    body: `We do not sell your personal information as a standalone product.

We may share information where reasonably necessary with:
• Payment and financial service providers for payment processing and refunds
• Delivery and logistics providers for dispatch and delivery
• Technology and hosting providers used to operate our website and systems, including cloud infrastructure such as AWS
• Professional advisers, such as accountants, auditors and legal advisers
• Schools, organisations and business customers where necessary to provide an agreed service
• Government or law enforcement authorities where required by law or lawful process

Service providers processing information on our behalf are expected to handle information appropriately and in accordance with applicable requirements.`,
  },
  {
    title: "7. Children's and Student Data",
    body: `Etome offers educational products that may be intended for children.

A parent, guardian, teacher, school or other authorised adult may purchase products from Etome on behalf of a child. Ordinary purchases through our e-commerce website do not require a child to create a personal account.

If Etome introduces services involving information relating to students or children, including student accounts, school platforms or learning technologies, we will implement appropriate safeguards and obtain any required parental, guardian, school or other lawful consent in accordance with applicable law.

Where a school or organisation provides student information to Etome, the relevant organisation is responsible for ensuring that it has the appropriate authority to provide that information.

Etome does not knowingly use children's personal information for behavioural monitoring, targeted advertising or similar purposes except where legally permitted and appropriately authorised.`,
  },
  {
    title: '8. B2B and School Information',
    body: `For school, institutional and business transactions, we may process information relating to teachers, school representatives, administrators, purchasing personnel and other authorised contacts.

Where our services require information relating to students or other individuals, processing will be carried out in accordance with the applicable service arrangement, instructions and legal requirements.

Where appropriate, Etome may enter into additional arrangements relating to data processing, security and confidentiality.`,
  },
  {
    title: '9. Marketing and Communications',
    body: `We may contact you regarding:
• Orders and transactions
• Customer support
• Product or service updates
• New products and services
• Offers and promotions
• Other marketing communications where permitted

You may opt out of promotional communications using the unsubscribe option provided or by contacting us.

Opting out of marketing communications will not prevent important transactional or service-related communications.`,
  },
  {
    title: '10. Data Retention',
    body: `We retain personal information for as long as reasonably necessary for purposes including:
• Completing transactions
• Providing services
• Customer support
• Maintaining business and financial records
• Resolving disputes
• Preventing fraud or misuse
• Complying with legal, tax, accounting or regulatory requirements

When information is no longer required, we may securely delete, anonymise or otherwise dispose of it in accordance with applicable requirements.`,
  },
  {
    title: '11. Data Security',
    body: `Etome takes reasonable technical and organisational measures to protect personal information against unauthorised access, misuse, alteration, disclosure or destruction.

However, no online system or electronic transmission can be guaranteed to be completely secure.`,
  },
  {
    title: '12. Your Privacy Rights',
    body: `Subject to applicable law, you may have rights relating to your personal information, including the right to:
• Request access to information held about you
• Request correction of inaccurate information
• Request deletion where legally applicable
• Withdraw consent where processing is based on consent
• Raise a grievance regarding processing of your information
• Exercise other rights available under applicable data protection law

We may need to verify your identity or request additional information before acting on a request where reasonably necessary.`,
  },
  {
    title: '13. Third-Party Websites',
    body: `Our website may contain links to third-party websites, applications or services.

This Privacy Policy does not govern the privacy practices of independent third parties. We recommend reviewing their privacy policies before providing personal information.`,
  },
  {
    title: '14. Changes to This Privacy Policy',
    body: `We may update this Privacy Policy to reflect changes in our products, services, technology, business practices or legal requirements.

The updated version will be published on this page with a revised "Last Updated" date.`,
  },
  {
    title: '15. Contact Us',
    body: `Etome Works Ltd
Door No. 142, Arickathil Business Centre
Kurishumood PO, Changanacherry, 686104
India

Email: support@etomeworks.com
Phone: +91-97786 90354

For consumer grievances, the details of our designated Grievance Officer will be displayed on our website.`,
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="pp-page">
      <Header />
      <div className="pp-body">
        <h1 className="pp-title">Privacy Policy</h1>
        <p className="pp-last-updated">Last Updated: 10 September 2026</p>

        <div className="pp-section">
          <h3 className="pp-section-title">1. Introduction</h3>
          <p style={{ whiteSpace: 'pre-line' }}>
            {`Welcome to Etomosphere, operated by Etome Works Ltd ("Etome", "we", "us" or "our").

This Privacy Policy explains how we collect, use, disclose, store and protect personal information when you visit or use etomosphere.com, purchase our products or services, contact us, or otherwise interact with us.

Etome provides educational products and services, including books, educational kits, toys, software, digital products and subscriptions.

By using our website or providing information to us, you acknowledge the practices described in this Privacy Policy.

This Privacy Policy should be read together with our Terms and Conditions, Return, Cancellation & Refund Policy, and Shipping and Delivery Policy.`}
          </p>
        </div>

        {sections.map((s) => (
          <div key={s.title} className="pp-section">
            <h3 className="pp-section-title">{s.title}</h3>
            <p style={{ whiteSpace: 'pre-line' }}>{s.body}</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
