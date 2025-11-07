import React, { useEffect, useState } from 'react';
import { ProductsAPI, CartAPI, CheckoutAPI } from './api';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import CheckoutModal from './components/CheckoutModal';

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(false);
  const [showReceipt, setShowReceipt] = useState(null);

  async function refreshCart() {
    const c = await CartAPI.get();
    setCart(c);
  }

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const p = await ProductsAPI.list();
        setProducts(p);
        await refreshCart();
      } catch (e) { alert(e.message); }
      finally { setLoading(false); }
    })();
  }, []);

  async function handleAdd(pid) {
    setLoading(true);
    try { setCart(await CartAPI.add(pid, 1)); }
    catch (e) { alert(e.message); }
    finally { setLoading(false); }
  }

  async function handleUpdate(id, qty) {
    setLoading(true);
    try { setCart(await CartAPI.update(id, qty)); }
    catch (e) { alert(e.message); }
    finally { setLoading(false); }
  }

  async function handleRemove(id) {
    setLoading(true);
    try { setCart(await CartAPI.remove(id)); }
    catch (e) { alert(e.message); }
    finally { setLoading(false); }
  }

  async function handleCheckout({ name, email }) {
    setLoading(true);
    try {
      const receipt = await CheckoutAPI.submit({ name, email });
      setShowReceipt(receipt);
      await refreshCart();
    } catch (e) { alert(e.message); }
    finally { setLoading(false); }
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Vibe Commerce – Mock Cart</h1>
        <div>{loading ? 'Loading…' : ''}</div>
      </div>

      <h2>Products</h2>
      <ProductGrid products={products} onAdd={handleAdd} />

      <h2>Cart</h2>
      <Cart cart={cart} onUpdate={handleUpdate} onRemove={handleRemove} />

      <div className="footer">
        <CheckoutModal total={cart.total} onSubmit={handleCheckout} />
      </div>

      {showReceipt && (
        <div className="modal" onClick={() => setShowReceipt(null)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <h3>Receipt</h3>
            <p><b>ID:</b> {showReceipt.receiptId}</p>
            <p><b>Name:</b> {showReceipt.name}</p>
            <p><b>Email:</b> {showReceipt.email}</p>
            <p><b>Total:</b> ₹{showReceipt.total.toFixed(2)}</p>
            <ul>
              {showReceipt.items.map(it => (
                <li key={it.id}>{it.name} × {it.qty} — ₹{(it.price * it.qty).toFixed(2)}</li>
              ))}
            </ul>
            <p><small>{new Date(showReceipt.timestamp).toLocaleString()}</small></p>
            <button className="btn primary" onClick={() => setShowReceipt(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
