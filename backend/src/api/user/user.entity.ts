import { sql } from 'drizzle-orm'
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core'

export const userEntity = sqliteTable('users', {
  id: integer('id').primaryKey(),
  phone: text('phone').unique(),
  email: text('email').notNull().unique(),
  psd: text('psd').notNull(),
  createdAt: text('createdAt')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`)
})
