import {
  admins,
  pizzas,
  ingredients,
  orders,
  contacts,
  type Admin,
  type InsertAdmin,
  type Pizza,
  type InsertPizza,
  type Ingredient,
  type InsertIngredient,
  type Order,
  type InsertOrder,
  type Contact,
  type InsertContact,
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Admin
  getAdminByUsername(username: string): Promise<Admin | undefined>;
  createAdmin(admin: InsertAdmin): Promise<Admin>;

  // Pizzas
  getAllPizzas(): Promise<Pizza[]>;
  getPizzaById(id: number): Promise<Pizza | undefined>;
  createPizza(pizza: InsertPizza): Promise<Pizza>;
  updatePizza(id: number, pizza: InsertPizza): Promise<Pizza | undefined>;
  deletePizza(id: number): Promise<boolean>;

  // Ingredients
  getAllIngredients(): Promise<Ingredient[]>;
  createIngredient(ingredient: InsertIngredient): Promise<Ingredient>;

  // Orders
  createOrder(order: InsertOrder): Promise<Order>;
  getAllOrders(): Promise<Order[]>;

  // Contacts
  createContact(contact: InsertContact): Promise<Contact>;
  getAllContacts(): Promise<Contact[]>;
}

export class DatabaseStorage implements IStorage {
  // Admin methods
  async getAdminByUsername(username: string): Promise<Admin | undefined> {
    const [admin] = await db.select().from(admins).where(eq(admins.username, username));
    return admin || undefined;
  }

  async createAdmin(insertAdmin: InsertAdmin): Promise<Admin> {
    const [admin] = await db.insert(admins).values(insertAdmin).returning();
    return admin;
  }

  // Pizza methods
  async getAllPizzas(): Promise<Pizza[]> {
    return await db.select().from(pizzas);
  }

  async getPizzaById(id: number): Promise<Pizza | undefined> {
    const [pizza] = await db.select().from(pizzas).where(eq(pizzas.id, id));
    return pizza || undefined;
  }

  async createPizza(insertPizza: InsertPizza): Promise<Pizza> {
    const [pizza] = await db.insert(pizzas).values(insertPizza).returning();
    return pizza;
  }

  async updatePizza(id: number, insertPizza: InsertPizza): Promise<Pizza | undefined> {
    const [pizza] = await db
      .update(pizzas)
      .set(insertPizza)
      .where(eq(pizzas.id, id))
      .returning();
    return pizza || undefined;
  }

  async deletePizza(id: number): Promise<boolean> {
    const result = await db.delete(pizzas).where(eq(pizzas.id, id));
    return true; // SQLite doesn't return rowCount
  }

  // Ingredient methods
  async getAllIngredients(): Promise<Ingredient[]> {
    return await db.select().from(ingredients);
  }

  async createIngredient(insertIngredient: InsertIngredient): Promise<Ingredient> {
    const [ingredient] = await db.insert(ingredients).values(insertIngredient).returning();
    return ingredient;
  }

  // Order methods
  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const [order] = await db.insert(orders).values(insertOrder).returning();
    return order;
  }

  async getAllOrders(): Promise<Order[]> {
    return await db.select().from(orders);
  }

  // Contact methods
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const [contact] = await db.insert(contacts).values(insertContact).returning();
    return contact;
  }

  async getAllContacts(): Promise<Contact[]> {
    return await db.select().from(contacts);
  }
}

export const storage = new DatabaseStorage();
