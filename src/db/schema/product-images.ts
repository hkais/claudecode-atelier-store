import { relations } from "drizzle-orm";
import {
  int,
  mysqlTable,
  smallint,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";

import { products } from "./products";

/** Position 0 is the primary image; the rest form the product gallery. */
export const productImages = mysqlTable(
  "product_images",
  {
    id: int("id", { unsigned: true }).autoincrement().primaryKey(),
    productId: int("product_id", { unsigned: true })
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    src: varchar("src", { length: 500 }).notNull(),
    alt: varchar("alt", { length: 255 }).notNull(),
    position: smallint("position", { unsigned: true }).notNull(),
  },
  (table) => [
    uniqueIndex("product_images_product_position_uq").on(
      table.productId,
      table.position,
    ),
  ],
);

export const productImagesRelations = relations(productImages, ({ one }) => ({
  product: one(products, {
    fields: [productImages.productId],
    references: [products.id],
  }),
}));
