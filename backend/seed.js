import { getDb } from './db.js';

const seedProducts = [
  { id: 1, name: 'Vibe Tee Classic', price: 499, image: 'https://picsum.photos/seed/tee/400/400' },
  { id: 2, name: 'Vibe Hoodie', price: 1499, image: 'https://picsum.photos/seed/hoodie/400/400' },
  { id: 3, name: 'Vibe Cap', price: 299, image: 'https://picsum.photos/seed/cap/400/400' },
  { id: 4, name: 'Vibe Mug', price: 199, image: 'https://picsum.photos/seed/mug/400/400' },
  { id: 5, name: 'Vibe Tote', price: 399, image: 'https://picsum.photos/seed/tote/400/400' },
  { id: 6, name: 'Vibe Stickers', price: 99, image: 'https://picsum.photos/seed/stickers/400/400' }
];

async function seed() {
  const db = await getDb();
  await db.exec('DELETE FROM cart;');
  await db.exec('DELETE FROM products;');
  const stmt = await db.prepare('INSERT INTO products (id, name, price, image) VALUES (?, ?, ?, ?)');
  for (const p of seedProducts) {
    await stmt.run(p.id, p.name, p.price, p.image);
  }
  await stmt.finalize();
  console.log('Seeded products:', seedProducts.length);
  await db.close();
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
