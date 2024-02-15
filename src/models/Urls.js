import pool from "../database/connection";

export async function createStatusType() {
  const query = `
      DO $$ BEGIN
      CREATE TYPE statusType AS ENUM ('active', 'inactive');
      EXCEPTION
      WHEN duplicate_object THEN null;
      END $$;
  `;

  pool
    .query(query)
    .then(() => {
      console.log("Status type created");
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function createUrlTable() {
  const query = `
      CREATE TABLE IF NOT EXISTS "Urls" (
        id SERIAL PRIMARY KEY,
        url_long TEXT NOT NULL,
        url_short TEXT NOT NULL UNIQUE,
        clicks NUMERIC DEFAULT 0,
        status statusType DEFAULT 'active',
        user_id INTEGER REFERENCES "Users"(id) ON DELETE CASCADE
      );
  `;

  pool
    .query(query)
    .then(() => {
      console.log("Url table created");
    })
    .catch((err) => {
      console.log(err);
    });
}
