export const AGREEMENTS = [
  ['marketplace', 'OEM Marketplace Agreement', 'The primary agreement that defines the terms and conditions for listing and selling products on EtomePlus.'],
  ['sla', 'Service Level Agreement (SLA)', 'Outlines service standards, order fulfilment, delivery timelines, returns, warranty, and after-sales support.'],
  ['commercial', 'Commercial Terms and Payment Schedule', 'Covers pricing, commissions, payment cycles, invoicing, and settlement terms.'],
];

export const DRAFT_KEY = 'etomosphere-oem-agreements-preview';

export function readAgreementDraft() {
  try {
    const draft = JSON.parse(sessionStorage.getItem(DRAFT_KEY));
    return Array.isArray(draft) ? draft.filter(id => AGREEMENTS.some(([key]) => key === id)) : [];
  } catch {
    return [];
  }
}
