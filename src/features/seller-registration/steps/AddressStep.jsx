import { INDIAN_STATES } from '../sellerFields.js';
import FieldRow from '../components/FieldRow.jsx';

export default function AddressStep({ form, errors, set }) {
  return (
    <>
      <div className="sr-step-tag">STEP 04</div>
      <h2 className="sr-title">Where is your Business Located?</h2>
      <p className="sr-desc">Provide your registered office address and operational dispatch details to facilitate company verification, courier coordination, logistics integration, and efficient regional customer support.</p>

      <h3 className="sr-section">Registered Office Address</h3>

      <div className="sr-three-col">
        <FieldRow label="Country / Territory" required error={errors.country}>
          <input className="sr-input" value={form.country} readOnly />
        </FieldRow>
        <FieldRow label="Postal PIN Code" required error={errors.pincode}>
          <input className="sr-input" placeholder="682030" maxLength={6} value={form.pincode} onChange={e => set('pincode', e.target.value.replace(/\D/g,''))} />
        </FieldRow>
        <FieldRow label="City / Corporation" required error={errors.city}>
          <input className="sr-input" placeholder="Kochi" value={form.city} onChange={e => set('city', e.target.value)} />
        </FieldRow>
      </div>

      <div className="sr-two-col">
        <FieldRow label="Building, Campus & Unit Suite Details" required error={errors.address_line1}>
          <input className="sr-input" placeholder="TechPark One, Block B, 4th Floor, Suite 402" value={form.address_line1} onChange={e => set('address_line1', e.target.value)} />
        </FieldRow>
        <FieldRow label="State / Union Territory" required error={errors.state}>
          <select className="sr-select" value={form.state} onChange={e => set('state', e.target.value)}>
            <option value="">Select state</option>
            {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </FieldRow>
      </div>

      <div className="sr-two-col">
        <FieldRow label="Street Address & Sector / Road" required error={errors.address_line2}>
          <input className="sr-input" placeholder="Kakkanad Special Economic Zone (CSEZ), Civil Station P.O." value={form.address_line2} onChange={e => set('address_line2', e.target.value)} />
        </FieldRow>
        <FieldRow label={<>Nearby Landmark <span className="sr-optional">(Optional)</span></>} error={errors.office_landmark}>
          <input className="sr-input" placeholder="Opposite InfoPark Expressway Gate 2" value={form.office_landmark} onChange={e => set('office_landmark', e.target.value)} />
        </FieldRow>
      </div>

      <h3 className="sr-section">Product Pickup &amp; Dispatch Location</h3>

      <div className="sr-three-col">
        <FieldRow label="Pickup Country" required error={errors.warehouse_country}>
          <input className="sr-input" value={form.warehouse_country} readOnly />
        </FieldRow>
        <FieldRow label="Warehouse PIN Code" required error={errors.warehouse_pincode}>
          <input className="sr-input" placeholder="560100" maxLength={6} value={form.warehouse_pincode} onChange={e => set('warehouse_pincode', e.target.value.replace(/\D/g,''))} />
        </FieldRow>
        <FieldRow label="City / Hub Location" required error={errors.warehouse_city}>
          <input className="sr-input" placeholder="Bengaluru" value={form.warehouse_city} onChange={e => set('warehouse_city', e.target.value)} />
        </FieldRow>
      </div>

      <div className="sr-two-col">
        <FieldRow label="Warehouse / SMT Facility Name & Plot" required error={errors.warehouse_facility}>
          <input className="sr-input" placeholder="ABC Central Logistics Hub & SMT Facility, Plot 42" value={form.warehouse_facility} onChange={e => set('warehouse_facility', e.target.value)} />
        </FieldRow>
        <FieldRow label="Warehouse State" required error={errors.warehouse_state}>
          <select className="sr-select" value={form.warehouse_state} onChange={e => set('warehouse_state', e.target.value)}>
            <option value="">Select state</option>
            {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </FieldRow>
      </div>

      <div className="sr-two-col">
        <FieldRow label="Street / Industrial Area" required error={errors.warehouse_street}>
          <input className="sr-input" placeholder="Electronics City Phase 1, Hosur Road" value={form.warehouse_street} onChange={e => set('warehouse_street', e.target.value)} />
        </FieldRow>
        <FieldRow label={<>Landmark for Freight Drivers <span className="sr-optional">(Optional)</span></>} error={errors.warehouse_landmark}>
          <input className="sr-input" placeholder="Near Toll Plaza, Keonics Electronic City" value={form.warehouse_landmark} onChange={e => set('warehouse_landmark', e.target.value)} />
        </FieldRow>
      </div>

      <div className="sr-two-col">
        <FieldRow label="Dispatch Contact Person" required error={errors.dispatch_contact}>
          <input className="sr-input" placeholder="Ramesh Chandran" value={form.dispatch_contact} onChange={e => set('dispatch_contact', e.target.value)} />
        </FieldRow>
        <FieldRow label="Dispatch Contact Mobile (Driver Calls)" required error={errors.dispatch_mobile}>
          <div className="sr-phone-wrap">
            <div className="sr-phone-code"><span>🇮🇳</span> +91</div>
            <input className="sr-input sr-input--phone" placeholder="98450 12345" value={form.dispatch_mobile} onChange={e => set('dispatch_mobile', e.target.value.replace(/\D/g,'').slice(0,10))} />
          </div>
        </FieldRow>
      </div>

      <h3 className="sr-section">Service, Installation &amp; Support Availability</h3>

      <div className="sr-two-col">
        <FieldRow label="Customer Technical Support Email" required error={errors.support_email}>
          <input className="sr-input" type="email" placeholder="support@abctechnologies.com" value={form.support_email} onChange={e => set('support_email', e.target.value)} />
        </FieldRow>
        <FieldRow label="Official Toll-Free / Support Helpline" required error={errors.support_helpline}>
          <input className="sr-input" placeholder="+91 1800 425 8899" value={form.support_helpline} onChange={e => set('support_helpline', e.target.value)} />
        </FieldRow>
      </div>
    </>
  );
}
