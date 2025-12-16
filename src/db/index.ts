import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { jobs, applications } from "./schema";

// Configuration de la connexion à PostgreSQL
const connectionString = process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/job_platform";

// Créer le client PostgreSQL
const client = postgres(connectionString, { max: 1 });

// Initialiser Drizzle ORM
export const db = drizzle(client);

export { jobs, applications };
