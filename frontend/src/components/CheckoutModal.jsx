import { useState } from 'react';

export default function CheckoutModal({ total, onSubmit }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  function submit(e) {
    e.preventDefault();
    onSubmit({ name, email });
    setOpen(false);
  }

  return (
    <>
      <button className="btn primary" disabled={total <= 0} onClick={() => setOpen(true)}>
        Checkout (₹{total.toFixed(2)})
      </button>
      {open && (
        <div className="modal" onClick={() => setOpen(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <h3>Checkout</h3>
            <form onSubmit={submit}>
              <div style={{ display: 'grid', gap: 10 }}>
                <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                <button className="btn primary" type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
