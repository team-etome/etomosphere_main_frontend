import React from 'react';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import '../privacy/privacy.css';

const sections = [
  {
    title: '2. Eligibility',
    body: `You must be legally capable of entering into a contract under applicable Indian law to place an order through the website.

Where a parent, guardian, school, teacher, organisation or other authorised person purchases products or services on behalf of a child or student, that person is responsible for ensuring that the purchase and use are appropriately authorised.`,
  },
  {
    title: '3. Products and Services',
    body: `Etome may offer educational books, learning materials, educational kits, toys, software, digital products, subscriptions and other education-related products and services.

We make reasonable efforts to ensure that product descriptions, specifications, images and prices displayed on the website are accurate.

However:
• Product colours may appear differently depending on your device.
• Images may be illustrative where indicated.
• Specifications may change due to product improvement or availability.
• Products may become unavailable or discontinued.

For products requiring installation, configuration or compatibility with other devices or software, customers are responsible for checking relevant requirements before purchase.`,
  },
  {
    title: '4. Orders',
    body: `When you place an order, you are requesting to purchase the selected product or service.

An order is considered accepted when Etome confirms the order and/or processes the applicable payment.

We may cancel or decline an order where reasonably necessary, including because of:
• Product unavailability
• Incorrect pricing or product information
• Technical or payment errors
• Suspected fraudulent or unauthorised activity
• Circumstances beyond our reasonable control

If an order is cancelled after payment has been received, any applicable refund will be processed in accordance with our Return, Cancellation & Refund Policy and applicable law.

Please review your delivery address, contact details and product selection before completing your purchase.`,
  },
  {
    title: '5. Prices and Payments',
    body: `Prices are displayed in Indian Rupees (INR), with applicable taxes and charges disclosed at checkout.

Any applicable shipping, handling, installation or other charges will be displayed before the order is completed.

Payments may be processed through HDFC's payment gateway or another payment service provider used by Etome.

Etome does not ordinarily receive or store your complete card number, CVV, UPI PIN or other full payment credentials.

You confirm that you are authorised to use the payment method used for your purchase.

Prices, product availability and promotional offers may change from time to time.`,
  },
  {
    title: '6. Shipping and Delivery',
    body: `We currently provide delivery within India, subject to product availability and serviceable locations.

Orders will be dispatched to the delivery address provided at checkout.

Estimated delivery timelines may vary depending on the product, destination, availability and logistics provider.

If there is a significant delay affecting your order, Etome will provide an update where reasonably possible.

Further information is available in our Shipping and Delivery Policy.`,
  },
  {
    title: '7. Cancellations, Returns and Refunds',
    body: `Cancellations, returns, replacements and refunds are governed by our separate Return, Cancellation & Refund Policy.

Nothing in these Terms limits any consumer rights or remedies that cannot legally be excluded or restricted.`,
  },
  {
    title: '8. Digital Products and Software',
    body: `Certain Etome products or services may be digital, subscription-based or software-based.

Unless otherwise stated:
• Digital products are provided for the permitted use specified at purchase.
• Software and digital content may be subject to additional licence terms.
• Access may depend on compatible devices, internet connectivity or other technical requirements.
• Unauthorised copying, redistribution, resale or sharing is not permitted.

Where a digital product or software service is defective or materially fails to conform to its description or agreed specifications, please contact us for an appropriate remedy.`,
  },
  {
    title: '9. Intellectual Property',
    body: `The website and its content, including text, graphics, photographs, designs, product descriptions, logos, software and other materials, are owned by or licensed to Etome unless otherwise stated.

You may use the website for lawful personal or business purposes connected with purchasing or using Etome's products and services.

You may not reproduce, modify, distribute, sell, publicly display or commercially exploit Etome's content or intellectual property without prior written permission, except where permitted by law.`,
  },
  {
    title: '10. Third-Party Services and Links',
    body: `The website may use or link to third-party services, including payment providers, logistics providers, hosting providers, analytics services or other technology services.

Third-party services may be governed by their own terms and privacy policies.`,
  },
  {
    title: '11. Acceptable Use',
    body: `You must not use the website:
• For fraudulent, unlawful or misleading purposes
• To interfere with or damage the website or its systems
• To introduce malicious software or harmful code
• To infringe intellectual property or privacy rights
• To misuse another person's personal information

Etome may take reasonable action where misuse is identified.`,
  },
  {
    title: '12. Website Availability',
    body: `We aim to keep the website available and functioning properly.

However, temporary interruptions may occur because of maintenance, technical issues, third-party service interruptions or circumstances beyond our reasonable control.

We do not guarantee that the website will always be uninterrupted, error-free or available.`,
  },
  {
    title: '13. Liability',
    body: `To the maximum extent permitted by applicable law, Etome will not be liable for indirect, incidental or consequential losses arising from the use of the website or products, including loss of profits or business opportunities.

Where liability can legally be limited, Etome's liability will generally be limited to the amount paid for the relevant product or service giving rise to the claim.

Nothing in these Terms excludes or limits any liability, consumer right or remedy that cannot lawfully be excluded or limited.`,
  },
  {
    title: '14. Indemnity',
    body: `To the extent permitted by applicable law, you are responsible for losses or claims arising directly from your unlawful use of the website, fraud or material breach of these Terms.`,
  },
  {
    title: '15. Changes to These Terms',
    body: `Etome may update these Terms from time to time to reflect changes to our products, services, website or applicable legal requirements.

The updated version will be posted on this page with a revised "Last Updated" date.`,
  },
  {
    title: '16. Governing Law',
    body: `These Terms are governed by the laws of India.

Subject to applicable consumer protection laws and jurisdictional requirements, disputes relating to these Terms shall be subject to the jurisdiction of the courts of Kochi, Kerala.`,
  },
  {
    title: '17. Grievance Redressal',
    body: `Grievance Officer: [NAME]
Designation: [DESIGNATION]
Email: support@etomeworks.com
Phone: +91-97786 90354
Address: Etome Works Ltd, Door No. 142, Arickathil Business Centre, Kurishumood PO, Changanacherry, 686104

Complaints will be handled in accordance with applicable law.`,
  },
];

export default function TermsConditions() {
  return (
    <div className="pp-page">
      <Header />
      <div className="pp-body">
        <h1 className="pp-title">Terms and Conditions</h1>
        <p className="pp-last-updated">Last Updated: 10 September 2026</p>

        <div className="pp-section">
          <h3 className="pp-section-title">1. About These Terms</h3>
          <p style={{ whiteSpace: 'pre-line' }}>
            {`Welcome to Etomosphere, operated by Etome Works Ltd ("Etome", "we", "us" or "our").

These Terms and Conditions govern your access to and use of etomosphere.com and your purchase of products and services through the website.

By using the website or placing an order, you agree to these Terms and our Privacy Policy, Return, Cancellation & Refund Policy, and Shipping and Delivery Policy.

If you do not agree with these Terms, please do not use the website or place an order.`}
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
