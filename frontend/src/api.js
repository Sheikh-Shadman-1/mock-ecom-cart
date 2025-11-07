const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

export async function api(path, opts = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...opts,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => '');
    throw new Error(msg || `Request failed: ${res.status}`);
  }
  return res.json();
}

export const ProductsAPI = {
  list: () => api('/api/products')
};

export const CartAPI = {
  get: () => api('/api/cart'),
  add: (productId, qty = 1) => api('/api/cart', { method: 'POST', body: { productId, qty } }),
  update: (id, qty) => api(`/api/cart/${id}`, { method: 'PUT', body: { qty } }),
  remove: (id) => api(`/api/cart/${id}`, { method: 'DELETE' })
};

export const CheckoutAPI = {
  submit: (payload) => api('/api/checkout', { method: 'POST', body: payload })
};
