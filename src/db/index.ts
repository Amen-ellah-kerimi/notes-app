import { drizzle } from "drizzle-orm/neon-http";
import { users } from "./schema";


const db = drizzle(process.env.DATABASE_URL);
const userCount = await db.$count(users);
const result = await db.execute('select 1');
