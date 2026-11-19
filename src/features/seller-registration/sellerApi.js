import axios from 'axios';

const sellerClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  timeout: 60000,
});

export function buildSellerPayload(form) {
  const payload = new FormData();
  for (const [field, value] of Object.entries(form)) {
    if (value == null || field === 'agree' || field === 'password2') continue;
    payload.append(field, Array.isArray(value) ? JSON.stringify(value) : value);
  }
  return payload;
}

export function registerSeller(form) {
  return sellerClient.post('/api/oem/register/', buildSellerPayload(form));
}

export function getSellerFieldErrors(error) {
  const data = error.response?.data;
  if (error.response?.status !== 400 || !data || typeof data !== 'object' || Array.isArray(data)) return {};
  return Object.fromEntries(Object.entries(data).flatMap(([field, value]) => {
    const message = Array.isArray(value) ? value.find(item => typeof item === 'string') : value;
    return typeof message === 'string' && message ? [[field, message]] : [];
  }));
}
