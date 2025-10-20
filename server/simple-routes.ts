import { createServer } from 'http';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import fs from 'fs';
import { checkAuth } from './simple-auth';
import * as data from './simple-data';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Upload configuration
const uploadDir = path.join(__dirname, '..', 'attached_assets', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'pizza-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

export async function registerRoutes(app: express.Application) {
  // Static files
  app.use('/attached_assets', express.static(path.join(__dirname, '..', 'attached_assets')));

  // Upload image
  app.post('/api/upload', upload.single('image'), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
      const imageUrl = `/attached_assets/uploads/${req.file.filename}`;
      res.json({ imageUrl });
    } catch (error: any) {
      res.status(500).json({ error: error.message || 'Upload failed' });
    }
  });

  // Admin login - ПРОСТАЯ ПРОВЕРКА
  app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;
    
    if (checkAuth(username, password)) {
      res.json({ success: true });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  });

  // Get all pizzas
  app.get('/api/pizzas', (req, res) => {
    res.json(data.pizzas);
  });

  // Get pizza by id
  app.get('/api/pizzas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pizza = data.pizzas.find(p => p.id === id);
    if (pizza) {
      res.json(pizza);
    } else {
      res.status(404).json({ error: 'Pizza not found' });
    }
  });

  // Create pizza
  app.post('/api/pizzas', (req, res) => {
    try {
      const pizza = data.addPizza(req.body);
      res.status(201).json(pizza);
    } catch (error: any) {
      res.status(400).json({ error: error.message || 'Invalid data' });
    }
  });

  // Update pizza
  app.put('/api/pizzas/:id', (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const pizza = data.updatePizza(id, req.body);
      if (pizza) {
        res.json(pizza);
      } else {
        res.status(404).json({ error: 'Pizza not found' });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message || 'Invalid data' });
    }
  });

  // Delete pizza
  app.delete('/api/pizzas/:id', (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = data.deletePizza(id);
      if (success) {
        res.json({ success: true });
      } else {
        res.status(404).json({ error: 'Pizza not found' });
      }
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to delete pizza' });
    }
  });

  // Get all ingredients
  app.get('/api/ingredients', (req, res) => {
    res.json(data.ingredients);
  });

  // Create ingredient
  app.post('/api/ingredients', (req, res) => {
    try {
      const ingredient = {
        id: data.ingredients.length + 1,
        ...req.body,
        available: true
      };
      data.ingredients.push(ingredient);
      res.status(201).json(ingredient);
    } catch (error: any) {
      res.status(400).json({ error: error.message || 'Invalid data' });
    }
  });

  // Create order
  app.post('/api/orders', (req, res) => {
    try {
      const order = data.addOrder(req.body);
      res.status(201).json(order);
    } catch (error: any) {
      res.status(400).json({ error: error.message || 'Invalid data' });
    }
  });

  // Get all orders
  app.get('/api/orders', (req, res) => {
    res.json(data.orders);
  });

  // Create contact
  app.post('/api/contacts', (req, res) => {
    try {
      const contact = data.addContact(req.body);
      res.status(201).json(contact);
    } catch (error: any) {
      res.status(400).json({ error: error.message || 'Invalid data' });
    }
  });

  // Get all contacts
  app.get('/api/contacts', (req, res) => {
    res.json(data.contacts);
  });

  const httpServer = createServer(app);
  return httpServer;
}
