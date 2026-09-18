import React from 'react';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import '../privacy/privacy.css';

const sections = [
  {
    title: '2. Order Processing',
    body: `Orders are processed after successful confirmation of the order and payment, where applicable.

Processing time may vary depending on:
• Product availability
• Order volume
• Product type
• Customisation or special requirements

If additional time is required to process an order, Etome will provide an update where reasonably possible.`,
  },
  {
    title: '3. Delivery Address',
    body: `Orders will be delivered to the address provided by the customer during checkout.

Customers are responsible for ensuring that the delivery address, phone number and other contact information provided are accurate.

If incorrect information results in a failed or delayed delivery, additional delivery arrangements or charges may apply where applicable.`,
  },
  {
    title: '4. Delivery Timeline',
    body: `Estimated delivery timelines may vary depending on:
• Delivery location
• Product availability
• Order processing time
• Logistics provider
• Local delivery conditions

Etome will provide an estimated delivery timeline where applicable.

If there is a significant delay affecting your order, we will provide an update where reasonably possible.

Delivery estimates are not guaranteed where delays arise from circumstances outside Etome's reasonable control.`,
  },
  {
    title: '5. Tracking',
    body: `Where tracking is available, tracking information may be provided after the order has been dispatched.

Tracking information is provided through the relevant logistics provider and may take time to become active after dispatch.`,
  },
  {
    title: '6. Delivery Delays',
    body: `Delivery may be delayed due to circumstances including:
• Weather conditions
• Natural events
• Transportation disruptions
• Address or contact issues
• Logistics provider delays
• High order volumes
• Government restrictions
• Other circumstances beyond Etome's reasonable control

Where we become aware of a significant delay, we will provide an update where reasonably possible.`,
  },
  {
    title: '7. Damaged or Incorrect Deliveries',
    body: `Customers should inspect products after delivery.

If your order arrives damaged, defective, incomplete or different from what you ordered, please contact:

support@etomeworks.com

as soon as reasonably possible and provide your order number and supporting photographs or other information where relevant.

Such requests will be handled under our Return, Cancellation & Refund Policy.`,
  },
  {
    title: '8. Undelivered or Failed Deliveries',
    body: `If a delivery cannot be completed because of an incorrect address, unavailable recipient, refusal to accept delivery or other customer-related issue, the logistics provider may attempt redelivery or return the shipment to Etome.

Additional delivery arrangements or charges may apply where applicable.`,
  },
  {
    title: '9. Delivery Charges',
    body: `Any applicable delivery or shipping charges will be displayed during checkout before the order is completed.`,
  },
  {
    title: '10. Contact Us',
    body: `For questions regarding delivery or an existing order:

Etome Works Ltd
Door No. 142, Arickathil Business Centre
Kurishumood PO, Changanacherry, 686104
India

Email: support@etomeworks.com
Phone: +91-97786 90354`,
  },
];

export default function ShippingPolicy() {
  return (
    <div className="pp-page">
      <Header />
      <div className="pp-body">
        <h1 className="pp-title">Shipping and Delivery Policy</h1>
        <p className="pp-last-updated">Last Updated: 10 September 2026</p>

        <div className="pp-section">
          <h3 className="pp-section-title">1. Overview</h3>
          <p style={{ whiteSpace: 'pre-line' }}>
            {`Etome Works Ltd, through Etomosphere, currently provides delivery of eligible physical products within India.

This policy explains how orders are processed and delivered.`}
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
