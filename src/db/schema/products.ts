import { relations } from "drizzle-orm";
import {
  index,
  int,
  json,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

import { categories } from "./categories";
import { productImages } from "./product-images";

export const products = mysqlTable(
  "products",
  {
    id: int("id", { unsigned: true }).autoincrement().primaryKey(),
    /** Public URL key: /products/[slug]. */
    slug: varchar("slug", { length: 150 }).notNull().unique(),
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description").notNull(),
    categoryId: int("category_id", { unsigned: true })
      .notNull()
      .references(() => categories.id, { onDelete: "restrict" }),
    /** Price in cents (USD). */
    priceCents: int("price_cents", { unsigned: true }).notNull(),
    color: varchar("color", { length: 100 }).notNull(),
    badge: mysqlEnum("badge", ["new", "limited"]),
    details: json("details").$type<string[]>().notNull(),
    /** Units available; 0 means sold out. */
    stock: int("stock", { unsigned: true }).notNull().default(0),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("products_category_id_idx").on(table.categoryId),
    index("products_created_at_idx").on(table.createdAt),
  ],
);

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  images: many(productImages),
}));
