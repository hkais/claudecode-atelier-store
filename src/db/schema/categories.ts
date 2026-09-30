import { relations } from "drizzle-orm";
import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

import { products } from "./products";

export const categories = mysqlTable("categories", {
  id: int("id", { unsigned: true }).autoincrement().primaryKey(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  name: varchar("name", { length: 100 }).notNull(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));
