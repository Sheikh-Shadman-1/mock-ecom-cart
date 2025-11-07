import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import dotenv from 'dotenv';
dotenv.config();

const DB_FILE = process.env.DB_FILE || './vibe.sqlite';

export async function getDb() {
  const db = await open({ filename: DB_FILE, driver: sqlite3.Database });
  await db.exec(`
    PRAGMA foreign_keys = ON;
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      image TEXT
    );
    CREATE TABLE IF NOT EXISTS cart (
      id INTEGER PRIMARY KEY,
      productId INTEGER NOT NULL,
      qty INTEGER NOT NULL CHECK(qty > 0),
      createdAt TEXT DEFAULT (datetime('now')),
      FOREIGN KEY(productId) REFERENCES products(id)
    );
  `);
  return db;
}
