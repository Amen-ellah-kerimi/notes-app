import { pgEnum, pgTable as table  } from "drizzle-orm/pg-core";
import { timestamps } from "./columns.helpers";
import * as t from "drizzle-orm/pg-core";


export const users = table(
    "users",
    {
        id: t.text('id').primaryKey().notNull(),
        isAdmin: t.boolean(),
        firstName: t.varchar("first_name", {length: 256}),
        lastName: t.varchar("last_name", { length: 256 }),
        email: t.varchar().notNull(),
        ...timestamps,
    },
    (table) => [ 
        t.uniqueIndex("email_idx").on(table.email)
    ]
);

export const notes = table(
    "notes",
    {
        id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
        slug: t.varchar().$default(() => generateUniqueString(16)),
        title: t.varchar({ length: 256 }),
        ownerId: t.text('owner_id').references(() => users.id),
    },
    (table) => [
        t.uniqueIndex("slug_idx").on(table.slug),
        t.index("title_idx").on(table.title),
    ]
);


function generateUniqueString(length: number = 12): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let uniqueString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    uniqueString += characters[randomIndex];
  }

  return uniqueString;
}




