import { pgTable, serial, text, boolean, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

// Admin table
export const admins = pgTable('admins', {
  id: serial('id').primaryKey(),
  username: text('username').notNull().unique(),
  password: text('password').notNull(),
});

// Pizzas table
export const pizzas = pgTable('pizzas', {
  id: serial('id').primaryKey(),
  nameEn: text('name_en').notNull(),
  nameUa: text('name_ua').notNull(),
  descriptionEn: text('description_en').notNull(),
  descriptionUa: text('description_ua').notNull(),
  category: text('category').notNull(), // classic, spicy, vegetarian, dessert
  price: text('price').notNull(),
  imageUrl: text('image_url').notNull(),
  available: boolean('available').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Ingredients table
export const ingredients = pgTable('ingredients', {
  id: serial('id').primaryKey(),
  nameEn: text('name_en').notNull(),
  nameUa: text('name_ua').notNull(),
  price: text('price').notNull(),
  available: boolean('available').default(true).notNull(),
});

// Orders table
export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  customerName: text('customer_name').notNull(),
  customerEmail: text('customer_email').notNull(),
  customerPhone: text('customer_phone').notNull(),
  deliveryAddress: text('delivery_address').notNull(),
  pizzaId: serial('pizza_id').notNull(),
  size: text('size').notNull(), // small, medium, large
  extraIngredients: text('extra_ingredients').notNull(), // JSON string of ingredient IDs
  totalPrice: text('total_price').notNull(),
  status: text('status').default('pending').notNull(), // pending, confirmed, delivered, cancelled
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Contacts table
export const contacts = pgTable('contacts', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  message: text('message').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
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

// Validation schemas
export const insertAdminSchema = createInsertSchema(admins).pick({
  username: true,
  password: true,
});

export const insertPizzaSchema = createInsertSchema(pizzas)
  .omit({
    id: true,
    createdAt: true,
  })
  .extend({
    price: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid price format'),
  });

export const insertIngredientSchema = createInsertSchema(ingredients)
  .omit({
    id: true,
  })
  .extend({
    price: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid price format'),
  });

export const insertOrderSchema = createInsertSchema(orders)
  .omit({
    id: true,
    createdAt: true,
    status: true,
  })
  .extend({
    totalPrice: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid price format'),
    customerEmail: z.string().email('Invalid email'),
    customerPhone: z.string().min(10, 'Phone number too short'),
    extraIngredients: z.string(), // JSON string
  });

export const insertContactSchema = createInsertSchema(contacts)
  .omit({
    id: true,
    createdAt: true,
  })
  .extend({
    email: z.string().email('Invalid email'),
    message: z.string().min(10, 'Message too short'),
  });
