import pool from "../database/connection";

export async function createRoleType() {
  const query = `
      DO $$ BEGIN
      CREATE TYPE roleType AS ENUM ('admin', 'user');
      EXCEPTION
      WHEN duplicate_object THEN null;
      END $$;`;

  pool
    .query(query)
    .then(() => {
      console.log("Role type created");
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function createUsersTable() {
  const query = `
      CREATE TABLE IF NOT EXISTS "Users" (
        id SERIAL PRIMARY KEY,
        username VARCHAR(20) UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role roleType DEFAULT 'user'
      );
  `;

  pool
    .query(query)
    .then(() => {
      console.log("Users table created");
    })
    .catch((err) => {
      console.log(err);
    });
}
