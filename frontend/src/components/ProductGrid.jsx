export default function ProductGrid({ products, onAdd }) {
  return (
    <div className="grid">
      {products.map(p => (
        <div className="card" key={p.id}>
          {p.image && <img src={p.image} alt={p.name} />}
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
            <b>{p.name}</b>
            <span>₹{p.price.toFixed(2)}</span>
          </div>
          <button className="btn primary" onClick={() => onAdd(p.id)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
