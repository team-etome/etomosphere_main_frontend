
export default function ReviewStep({ form, setStep }) {
  return (
    <>
      <p className="sr-desc">Please review your information before submitting. You can go back to any step to make changes.</p>

      {[
        { title: 'Contact Information', step: 1, rows: [
          ['Full Name', form.full_name], ['Email', form.email], ['Mobile', `+91 ${form.mobile}`],
        ]},
        { title: 'Company Details', step: 2, rows: [
          ['Company', form.company_name], ['Business Model', form.business_model || '—'],
          ['GST', form.gst_number || '—'], ['PAN', form.pan_number || '—'],
        ]},
        { title: 'Business Verification', step: 3, rows: [
          ['GSTIN', form.gst_number || '—'], ['PAN', form.pan_number || '—'],
          ['Registration Type', form.registration_type || '—'], ['CIN', form.cin_number || '—'],
        ]},
        { title: 'Business Address', step: 4, rows: [
          ['Office Address', [form.address_line1, form.address_line2].filter(Boolean).join(', ')],
          ['City / PIN', `${form.city} — ${form.pincode}`], ['State', form.state],
          ['Warehouse City', form.warehouse_city || '—'], ['Support Email', form.support_email || '—'],
        ]},
      ].map(section => (
        <div key={section.title} className="sr-review-card">
          <div className="sr-review-hdr">
            <span>{section.title}</span>
            <button type="button" className="sr-review-edit" onClick={() => setStep(section.step)}>Edit</button>
          </div>
          {section.rows.map(([k, v]) => (
            <div key={k} className="sr-review-row">
              <span className="sr-review-key">{k}</span>
              <span className="sr-review-val">{v}</span>
            </div>
          ))}
        </div>
      ))}

    </>
  );
}
