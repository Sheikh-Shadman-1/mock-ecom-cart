import express from 'express';
import { getDb } from '../db.js';

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const db = await getDb();
    const products = await db.all('SELECT id, name, price, image FROM products ORDER BY id');
    res.json(products);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

export default router;
