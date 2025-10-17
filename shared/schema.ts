import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean, decimal, serial } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Admin user table
export const admins = pgTable("admins", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Pizza categories: Classic, Spicy, Vegetarian, Dessert
export const pizzas = pgTable("pizzas", {
  id: serial("id").primaryKey(),
  nameEn: text("name_en").notNull(),
  nameUa: text("name_ua").notNull(),
  descriptionEn: text("description_en").notNull(),
  descriptionUa: text("description_ua").notNull(),
  category: text("category").notNull(), // classic, spicy, vegetarian, dessert
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  imageUrl: text("image_url").notNull(),
  available: boolean("available").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Available ingredients for pizza customization
export const ingredients = pgTable("ingredients", {
  id: serial("id").primaryKey(),
  nameEn: text("name_en").notNull(),
  nameUa: text("name_ua").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  available: boolean("available").default(true).notNull(),
});

// Orders table
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone").notNull(),
  deliveryAddress: text("delivery_address").notNull(),
  pizzaId: integer("pizza_id").notNull(),
  size: text("size").notNull(), // small, medium, large
  extraIngredients: text("extra_ingredients").array(), // array of ingredient IDs
  totalPrice: decimal("total_price", { precision: 10, scale: 2 }).notNull(),
  status: text("status").default("pending").notNull(), // pending, confirmed, delivered, cancelled
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Contact form submissions
export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Relations
export const ordersRelations = relations(orders, ({ one }) => ({
  pizza: one(pizzas, {
    fields: [orders.pizzaId],
    references: [pizzas.id],
  }),
}));

export const pizzasRelations = relations(pizzas, ({ many }) => ({
  orders: many(orders),
}));

// Zod schemas for validation
export const insertAdminSchema = createInsertSchema(admins).pick({
  username: true,
  password: true,
});

export const insertPizzaSchema = createInsertSchema(pizzas).omit({
  id: true,
  createdAt: true,
}).extend({
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
});

export const insertIngredientSchema = createInsertSchema(ingredients).omit({
  id: true,
}).extend({
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  createdAt: true,
  status: true,
}).extend({
  totalPrice: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
  customerEmail: z.string().email("Invalid email"),
  customerPhone: z.string().min(10, "Phone number too short"),
});

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true,
}).extend({
  email: z.string().email("Invalid email"),
  message: z.string().min(10, "Message too short"),
});

// TypeScript types
export type Admin = typeof admins.$inferSelect;
export type InsertAdmin = z.infer<typeof insertAdminSchema>;

export type Pizza = typeof pizzas.$inferSelect;
export type InsertPizza = z.infer<typeof insertPizzaSchema>;

export type Ingredient = typeof ingredients.$inferSelect;
export type InsertIngredient = z.infer<typeof insertIngredientSchema>;

export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;

export type Contact = typeof contacts.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;
