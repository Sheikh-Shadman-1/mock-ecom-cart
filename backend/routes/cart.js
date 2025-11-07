import express from 'express';
import { getDb } from '../db.js';

const router = express.Router();

async function getCartWithTotals(db) {
  const items = await db.all(`
    SELECT c.id, c.productId, c.qty, p.name, p.price, p.image,
           (p.price * c.qty) AS subtotal
    FROM cart c JOIN products p ON p.id = c.productId
    ORDER BY c.id DESC
  `);
  const total = items.reduce((s, it) => s + it.subtotal, 0);
  return { items, total };
}

router.get('/', async (_req, res) => {
  try {
    const db = await getDb();
    const data = await getCartWithTotals(db);
    res.json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

router.post('/', async (req, res) => {
  const { productId, qty } = req.body || {};
  if (!productId || !qty || qty <= 0) return res.status(400).json({ error: 'productId and positive qty required' });
  try {
    const db = await getDb();
    const product = await db.get('SELECT id FROM products WHERE id = ?', productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    const existing = await db.get('SELECT id, qty FROM cart WHERE productId = ?', productId);
    if (existing) {
      await db.run('UPDATE cart SET qty = ? WHERE id = ?', existing.qty + qty, existing.id);
    } else {
      await db.run('INSERT INTO cart (productId, qty) VALUES (?, ?)', productId, qty);
    }

    const data = await getCartWithTotals(db);
    res.status(201).json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to add to cart' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { qty } = req.body || {};
  if (!qty || qty <= 0) return res.status(400).json({ error: 'positive qty required' });
  try {
    const db = await getDb();
    const row = await db.get('SELECT id FROM cart WHERE id = ?', id);
    if (!row) return res.status(404).json({ error: 'Cart item not found' });
    await db.run('UPDATE cart SET qty = ? WHERE id = ?', qty, id);
    const data = await getCartWithTotals(db);
    res.json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to update cart item' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const db = await getDb();
    await db.run('DELETE FROM cart WHERE id = ?', id);
    const data = await getCartWithTotals(db);
    res.json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to remove cart item' });
  }
});

export default router;
