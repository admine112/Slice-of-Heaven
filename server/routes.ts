import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertPizzaSchema, 
  insertIngredientSchema, 
  insertOrderSchema, 
  insertContactSchema,
  insertAdminSchema 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Admin authentication
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      const admin = await storage.getAdminByUsername(username);
      
      // Simple password check (in production, use hashed passwords)
      if (admin && admin.password === password) {
        res.json({ success: true });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });

  // Pizzas CRUD
  app.get("/api/pizzas", async (req, res) => {
    try {
      const pizzas = await storage.getAllPizzas();
      res.json(pizzas);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch pizzas" });
    }
  });

  app.get("/api/pizzas/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const pizza = await storage.getPizzaById(id);
      if (pizza) {
        res.json(pizza);
      } else {
        res.status(404).json({ error: "Pizza not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch pizza" });
    }
  });

  app.post("/api/pizzas", async (req, res) => {
    try {
      const validatedData = insertPizzaSchema.parse(req.body);
      const pizza = await storage.createPizza(validatedData);
      res.status(201).json(pizza);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Invalid data" });
    }
  });

  app.put("/api/pizzas/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertPizzaSchema.parse(req.body);
      const pizza = await storage.updatePizza(id, validatedData);
      if (pizza) {
        res.json(pizza);
      } else {
        res.status(404).json({ error: "Pizza not found" });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Invalid data" });
    }
  });

  app.delete("/api/pizzas/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deletePizza(id);
      if (success) {
        res.json({ success: true });
      } else {
        res.status(404).json({ error: "Pizza not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete pizza" });
    }
  });

  // Ingredients
  app.get("/api/ingredients", async (req, res) => {
    try {
      const ingredients = await storage.getAllIngredients();
      res.json(ingredients);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch ingredients" });
    }
  });

  app.post("/api/ingredients", async (req, res) => {
    try {
      const validatedData = insertIngredientSchema.parse(req.body);
      const ingredient = await storage.createIngredient(validatedData);
      res.status(201).json(ingredient);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Invalid data" });
    }
  });

  // Orders
  app.post("/api/orders", async (req, res) => {
    try {
      const validatedData = insertOrderSchema.parse(req.body);
      const order = await storage.createOrder(validatedData);
      res.status(201).json(order);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Invalid data" });
    }
  });

  app.get("/api/orders", async (req, res) => {
    try {
      const orders = await storage.getAllOrders();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  });

  // Contacts
  app.post("/api/contacts", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.status(201).json(contact);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Invalid data" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
