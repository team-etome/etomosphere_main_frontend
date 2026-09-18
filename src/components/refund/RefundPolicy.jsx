import React from 'react';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import '../privacy/privacy.css';

const sections = [
  {
    title: '2. Order Cancellation',
    body: `You may request cancellation of an order before it has been dispatched by contacting:

support@etomeworks.com

Please provide your name, order number and reason for cancellation.

Once an order has been dispatched, cancellation may no longer be possible. In such cases, the request may be handled under the applicable return or refund process.

Where cancellation is accepted and payment has already been received, any applicable refund will be processed to the original payment method.`,
  },
  {
    title: '3. Returns',
    body: `A return may be accepted where the product is:
• Defective or damaged
• Incorrect or different from the product ordered
• Materially different from its description or specifications
• Otherwise eligible for return under applicable law or a specific offer

For eligible physical products, we may require the product to be returned in its original or reasonably complete condition, together with available packaging, accessories and proof of purchase.

The condition of the product may be reviewed before a replacement or refund is approved.`,
  },
  {
    title: '4. Damaged, Defective or Incorrect Products',
    body: `Please inspect your order after delivery and contact us as soon as reasonably possible if:
• The product arrives damaged
• The wrong product has been delivered
• An item is missing
• The product appears to have a manufacturing defect

Please provide your order number and, where useful, photographs or videos showing the issue.

After reviewing the issue, Etome may provide an appropriate remedy, including replacement, repair, refund or another applicable solution.`,
  },
  {
    title: '5. Products That May Not Be Returnable',
    body: `Certain products may not be eligible for return where the nature of the product makes return inappropriate, including:
• Digital downloads or digital books once access or download has been provided
• Software licences or subscriptions, subject to applicable law
• Personalised or customised products
• Products materially altered or damaged after delivery through improper use, installation or handling
• Opened consumable products, where applicable

This does not limit consumer rights that cannot legally be excluded.`,
  },
  {
    title: '6. Change-of-Mind Returns',
    body: `Etome does not provide a general change-of-mind return unless the specific product listing or promotional offer expressly states otherwise.

A return request based only on a change of mind may therefore be declined where no return right otherwise applies.`,
  },
  {
    title: '7. Refunds',
    body: `Where a refund is approved, Etome will normally process it to the original payment method.

The time required for the refund to appear may depend on the payment gateway, bank or other payment service provider.

Refunds will be processed within the period required under applicable law or, where no specific period applies, within a reasonable period after approval.`,
  },
  {
    title: '8. Return Shipping',
    body: `Where a return is accepted because the product was damaged, defective, incorrect or otherwise the responsibility of Etome, we will provide appropriate instructions regarding return logistics.

For other approved returns, any applicable return shipping costs will be communicated to the customer before the return is processed.`,
  },
  {
    title: '9. How to Request a Return or Refund',
    body: `Contact:

support@etomeworks.com

Please include:
• Name
• Order number
• Product purchased
• Reason for the request
• Photographs or other supporting information, where relevant

We may request additional information reasonably required to assess the request.`,
  },
  {
    title: '10. Contact',
    body: `Etome Works Ltd
Door No. 142, Arickathil Business Centre
Kurishumood PO, Changanacherry, 686104
India

Email: support@etomeworks.com
Phone: +91-97786 90354`,
  },
];

export default function RefundPolicy() {
  return (
    <div className="pp-page">
      <Header />
      <div className="pp-body">
        <h1 className="pp-title">Return, Cancellation &amp; Refund Policy</h1>
        <p className="pp-last-updated">Last Updated: 10 September 2026</p>

        <div className="pp-section">
          <h3 className="pp-section-title">1. Overview</h3>
          <p style={{ whiteSpace: 'pre-line' }}>
            {`At Etome, we aim to provide reliable educational products and services.

This policy explains when an order may be cancelled, returned, replaced or refunded.

All requests are subject to the nature of the product, the circumstances of the request and applicable law.`}
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
