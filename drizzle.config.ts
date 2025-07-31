import { defineConfig } from "drizzle-kit";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

export default defineConfig({
    dialect: 'postgresql',
    schema: './src/db/schema.ts',
    dbCredentials: {
        url: process.env.DATABASE_URL as string,
    },
    out: "./src/db/migrations"
});
