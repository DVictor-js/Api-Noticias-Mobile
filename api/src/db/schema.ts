import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const noticias = sqliteTable("noticias", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  titulo: text("titulo").notNull(),
  conteudo: text("conteudo").notNull(),
  autor: text("autor").notNull(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(datetime('now', 'localtime'))`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(datetime('now', 'localtime'))`),
});

export type Noticia = typeof noticias.$inferSelect;
export type NovaNoticia = typeof noticias.$inferInsert;
