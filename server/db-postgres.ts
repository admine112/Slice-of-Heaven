import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '@shared/schema';

// Vercel Postgres connection
const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;

let db: any;

if (connectionString) {
  // Use PostgreSQL for Vercel
  const client = postgres(connectionString);
  db = drizzle(client, { schema });
  console.log('✅ Connected to PostgreSQL');
} else {
  // Fallback to SQLite for local development
  console.log('⚠️  No POSTGRES_URL found, using SQLite');
  const { drizzle: drizzleSqlite } = require('drizzle-orm/better-sqlite3');
  const Database = require('better-sqlite3');
  const sqlite = new Database('sqlite.db');
  db = drizzleSqlite(sqlite, { schema });
  console.log('✅ Connected to SQLite (local)');
}

export { db };
