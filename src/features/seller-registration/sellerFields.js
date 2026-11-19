export const INDIAN_STATES = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat',
  'Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh',
  'Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan',
  'Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal',
  'Delhi','Jammu & Kashmir','Ladakh','Puducherry',
];

export const REGISTRATION_TYPES = [
  'Private Limited Company (Pvt. Ltd.)',
  'Public Limited Company (Ltd.)',
  'One Person Company (OPC)',
  'Limited Liability Partnership (LLP)',
  'Partnership Firm',
  'Sole Proprietorship',
  'Other',
];

export const BUSINESS_MODELS = [
  { key: 'manufacturer', label: 'Manufacturer / OEM' },
  { key: 'brand_owner',  label: 'Brand Owner' },
  { key: 'distributor',  label: 'Auth. Distributor' },
  { key: 'reseller',     label: 'Dealer / Reseller' },
];

export const DESIGNATIONS = [
  'CEO / Managing Director', 'Director', 'Business Development Director',
  'General Manager', 'Sales Manager', 'Proprietor', 'Partner', 'Other',
];

export const currentYear = new Date().getFullYear();
export const YEAR_OPTIONS = Array.from({ length: 50 }, (_, i) => currentYear - i);

export const initForm = {
  // Step 1
  full_name: '', email: '', mobile: '', password: '', password2: '', agree: false,
  // Step 2
  company_name: '', brand_trading_name: '', business_model: '',
  year_established: '', website: '', company_overview: '',
  signatory_name: '', signatory_designation: '', signatory_email: '',
  signatory_mobile: '', alternate_contact: '',
  // Step 3
  gst_number: '', pan_number: '', registration_type: '', cin_number: '',
  gst_certificate: null, pan_card: null, incorporation_doc: null, oem_auth_letter: null,
  // Step 4 — Registered Office Address
  country: 'India (Bharat)', pincode: '', city: '', address_line1: '', state: '', address_line2: '', office_landmark: '',
  // Step 4 — Warehouse / Dispatch
  warehouse_country: 'India (Domestic)', warehouse_pincode: '', warehouse_city: '',
  warehouse_facility: '', warehouse_state: '', warehouse_street: '', warehouse_landmark: '',
  dispatch_contact: '', dispatch_mobile: '',
  // Step 4 — Support
  support_email: '', support_helpline: '',
};

export function validateSellerStep(step, form) {
    const e = {};
    if (step === 1) {
      if (!form.full_name.trim()) e.full_name = 'Full name is required';
      if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
      if (!form.mobile.trim() || form.mobile.replace(/\D/g,'').length < 10) e.mobile = 'Valid 10-digit mobile required';
      if (!form.password || form.password.length < 8) e.password = 'Password must be at least 8 characters';
      if (form.password !== form.password2) e.password2 = 'Passwords do not match';
      if (!form.agree) e.agree = 'You must agree to the terms';
    }
    if (step === 2) {
      if (!form.company_name.trim())        e.company_name           = 'Legal company name is required';
      if (!form.business_model)             e.business_model         = 'Select a business model';
      if (!form.year_established)           e.year_established       = 'Year of establishment is required';
      if (!form.website.trim())             e.website                = 'Company website is required';
      if (!form.company_overview.trim())    e.company_overview       = 'Company overview is required';
      if (!form.signatory_name.trim())      e.signatory_name         = 'Signatory name is required';
      if (!form.signatory_designation)      e.signatory_designation  = 'Designation is required';
      if (!form.signatory_email.trim() || !/\S+@\S+\.\S+/.test(form.signatory_email))
                                            e.signatory_email        = 'Valid email required';
      if (!form.signatory_mobile.trim() || form.signatory_mobile.length < 10)
                                            e.signatory_mobile       = 'Valid 10-digit mobile required';
    }
    if (step === 3) {
      if (!form.gst_number.trim())       e.gst_number       = 'GSTIN is required';
      if (!form.pan_number.trim())       e.pan_number       = 'PAN Number is required';
      if (!form.registration_type)       e.registration_type = 'Select registration type';
      if (!form.cin_number.trim())       e.cin_number       = 'CIN is required';
    }
    if (step === 4) {
      if (!form.pincode.trim()           || !/^\d{6}$/.test(form.pincode))          e.pincode           = 'Valid 6-digit PIN required';
      if (!form.city.trim())                                                          e.city              = 'City is required';
      if (!form.address_line1.trim())                                                 e.address_line1     = 'Building details required';
      if (!form.state)                                                                e.state             = 'State is required';
      if (!form.address_line2.trim())                                                 e.address_line2     = 'Street address is required';
      if (!form.warehouse_pincode.trim() || !/^\d{6}$/.test(form.warehouse_pincode)) e.warehouse_pincode = 'Valid 6-digit PIN required';
      if (!form.warehouse_city.trim())                                                e.warehouse_city    = 'City is required';
      if (!form.warehouse_facility.trim())                                            e.warehouse_facility= 'Facility name is required';
      if (!form.warehouse_state)                                                      e.warehouse_state   = 'State is required';
      if (!form.warehouse_street.trim())                                              e.warehouse_street  = 'Street is required';
      if (!form.dispatch_contact.trim())                                              e.dispatch_contact  = 'Contact person required';
      if (!form.dispatch_mobile.trim())                                               e.dispatch_mobile   = 'Mobile number required';
      if (!form.support_email.trim()     || !/\S+@\S+\.\S+/.test(form.support_email)) e.support_email   = 'Valid email required';
      if (!form.support_helpline.trim())                                              e.support_helpline  = 'Helpline number required';
    }
  return e;
}
