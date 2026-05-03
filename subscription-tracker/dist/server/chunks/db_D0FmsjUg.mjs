import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';

const dbPath = process.env.DB_PATH
  ? path.resolve(process.env.DB_PATH)
  : path.resolve(process.cwd(), 'data', 'subscriptions.sqlite');

const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS subscriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    cost REAL NOT NULL,
    description TEXT,
    notes TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS calendar_entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    day INTEGER NOT NULL,
    subscription_id INTEGER NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    UNIQUE(day, subscription_id),
    FOREIGN KEY(subscription_id) REFERENCES subscriptions(id) ON DELETE CASCADE
  );
`);

function listSubscriptions() {
  return db.prepare('SELECT * FROM subscriptions ORDER BY id DESC').all();
}

function createSubscription({ title, cost, description, notes }) {
  const stmt = db.prepare(
    'INSERT INTO subscriptions (title, cost, description, notes) VALUES (?, ?, ?, ?)'
  );
  const result = stmt.run(title, cost, description ?? '', notes ?? '');
  return db.prepare('SELECT * FROM subscriptions WHERE id = ?').get(result.lastInsertRowid);
}

function updateSubscription(id, { title, cost, description, notes }) {
  db.prepare(
    'UPDATE subscriptions SET title = ?, cost = ?, description = ?, notes = ? WHERE id = ?'
  ).run(title, cost, description ?? '', notes ?? '', id);
  return db.prepare('SELECT * FROM subscriptions WHERE id = ?').get(id);
}

function deleteSubscription(id) {
  db.prepare('DELETE FROM calendar_entries WHERE subscription_id = ?').run(id);
  return db.prepare('DELETE FROM subscriptions WHERE id = ?').run(id);
}

function listCalendarEntries() {
  return db
    .prepare(
      `SELECT calendar_entries.id, calendar_entries.day, subscriptions.id AS subscriptionId,
              subscriptions.title, subscriptions.cost
       FROM calendar_entries
       JOIN subscriptions ON subscriptions.id = calendar_entries.subscription_id
       ORDER BY calendar_entries.day ASC, subscriptions.title ASC`
    )
    .all();
}

function assignSubscriptionToDay(day, subscriptionId) {
  const stmt = db.prepare(
    'INSERT OR IGNORE INTO calendar_entries (day, subscription_id) VALUES (?, ?)'
  );
  stmt.run(day, subscriptionId);
  return listCalendarEntries();
}

function removeSubscriptionFromDay(day, subscriptionId) {
  db.prepare('DELETE FROM calendar_entries WHERE day = ? AND subscription_id = ?')
    .run(day, subscriptionId);
  return listCalendarEntries();
}

export { assignSubscriptionToDay as a, listSubscriptions as b, createSubscription as c, deleteSubscription as d, listCalendarEntries as l, removeSubscriptionFromDay as r, updateSubscription as u };
