import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { jobs, applications } from "./schema";

const connectionString = process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/job_platform";
const client = postgres(connectionString, { max: 1 });
const db = drizzle(client);

async function migrate() {
  console.log("Starting database migration...");

  try {
    // Créer les tables si elles n'existent pas
    await client`CREATE TABLE IF NOT EXISTS jobs (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      category VARCHAR(100) NOT NULL,
      type VARCHAR(50) NOT NULL,
      location VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      requirements TEXT NOT NULL,
      salary VARCHAR(100),
      posted_at TIMESTAMP DEFAULT NOW() NOT NULL,
      updated_at TIMESTAMP,
      is_active INTEGER DEFAULT 1 NOT NULL
    );`;

    await client`CREATE TABLE IF NOT EXISTS applications (
      id SERIAL PRIMARY KEY,
      job_id INTEGER REFERENCES jobs(id),
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      resume_url TEXT NOT NULL,
      message TEXT,
      status VARCHAR(50) DEFAULT 'pending' NOT NULL,
      applied_at TIMESTAMP DEFAULT NOW() NOT NULL
    );`;

    console.log("✓ Database migration completed successfully");
  } catch (error) {
    console.error("✗ Migration failed:", error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

migrate();
