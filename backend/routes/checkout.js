import express from 'express';
import { getDb } from '../db.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const db = await getDb();
    const items = await db.all(`
      SELECT c.id, c.productId, c.qty, p.name, p.price, (p.price * c.qty) AS subtotal
      FROM cart c JOIN products p ON p.id = c.productId
    `);
    const total = items.reduce((s, it) => s + it.subtotal, 0);

    const receipt = {
      receiptId: 'RCPT-' + Math.random().toString(36).slice(2, 8).toUpperCase(),
      total,
      items,
      name: req.body?.name || 'Guest',
      email: req.body?.email || 'guest@example.com',
      timestamp: new Date().toISOString()
    };

    await db.exec('DELETE FROM cart;');
    res.json(receipt);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Checkout failed' });
  }
});

export default router;
