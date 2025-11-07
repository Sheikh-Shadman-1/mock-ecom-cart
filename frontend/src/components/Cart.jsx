export default function Cart({ cart, onUpdate, onRemove }) {
  if (!cart.items.length) return <div className="cart">Your cart is empty.</div>;
  return (
    <div className="cart">
      {cart.items.map(it => (
        <div className="row" key={it.id}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {it.image && <img src={it.image} alt="" width={48} height={48} style={{ borderRadius: 8, objectFit: 'cover' }} />}
            <div>
              <div><b>{it.name}</b></div>
              <div>₹{it.price.toFixed(2)} each</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input type="number" min={1} value={it.qty}
              onChange={e => onUpdate(it.id, parseInt(e.target.value || '1', 10))} />
            <div>₹{it.subtotal.toFixed(2)}</div>
            <button className="btn ghost" onClick={() => onRemove(it.id)}>Remove</button>
          </div>
        </div>
      ))}
      <div className="row total">
        <div>Total</div>
        <div>₹{cart.total.toFixed(2)}</div>
      </div>
    </div>
  );
}
