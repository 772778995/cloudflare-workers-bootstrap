import { DrizzleD1Database } from 'drizzle-orm/d1'

declare global {
  type DB = DrizzleD1Database<Record<string, never>>
}
