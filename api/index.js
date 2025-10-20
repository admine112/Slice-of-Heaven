// Vercel Serverless Function
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json());

// Simple auth
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

// Пути к файлам данных
const DATA_DIR = path.join('/tmp', 'pizza-data');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const CONTACTS_FILE = path.join(DATA_DIR, 'contacts.json');

// Создаем директорию если не существует
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Функции для работы с файлами
function readOrders() {
  try {
    if (fs.existsSync(ORDERS_FILE)) {
      const data = fs.readFileSync(ORDERS_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading orders:', error);
  }
  return [];
}

function writeOrders(orders) {
  try {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing orders:', error);
    return false;
  }
}

function readContacts() {
  try {
    if (fs.existsSync(CONTACTS_FILE)) {
      const data = fs.readFileSync(CONTACTS_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading contacts:', error);
  }
  return [];
}

function writeContacts(contacts) {
  try {
    fs.writeFileSync(CONTACTS_FILE, JSON.stringify(contacts, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing contacts:', error);
    return false;
  }
}

// Статические данные (не меняются)
const pizzas = [
  {
    id: 1,
    nameEn: 'Margherita Classic',
    nameUa: 'Маргарита Класична',
    descriptionEn: 'Fresh mozzarella, tomato sauce, basil, and olive oil',
    descriptionUa: 'Свіжа моцарела, томатний соус, базилік та оливкова олія',
    category: 'classic',
    price: '12.99',
    imageUrl: '/attached_assets/generated_images/Classic_margherita_pizza_photo_05343f97.png',
    available: true,
  },
  {
    id: 2,
    nameEn: 'Inferno Diablo',
    nameUa: 'Пекельний Діабло',
    descriptionEn: 'Spicy pepperoni, jalapeños, hot chili peppers',
    descriptionUa: 'Гостра пепероні, халапеньйо, гострий чилі',
    category: 'spicy',
    price: '15.99',
    imageUrl: '/attached_assets/generated_images/Spicy_diablo_pizza_photo_c5e8a9d3.png',
    available: true,
  },
  {
    id: 3,
    nameEn: 'Garden Paradise',
    nameUa: 'Райський Сад',
    descriptionEn: 'Bell peppers, mushrooms, olives, tomatoes',
    descriptionUa: 'Болгарський перець, гриби, оливки, помідори',
    category: 'vegetarian',
    price: '13.99',
    imageUrl: '/attached_assets/generated_images/Vegetarian_garden_pizza_photo_7a2b4e91.png',
    available: true,
  },
  {
    id: 4,
    nameEn: 'Chocolate Heaven',
    nameUa: 'Шоколадний Рай',
    descriptionEn: 'Nutella, strawberries, powdered sugar',
    descriptionUa: 'Нутелла, полуниця, цукрова пудра',
    category: 'dessert',
    price: '11.99',
    imageUrl: '/attached_assets/generated_images/Dessert_chocolate_pizza_photo_e383cb23.png',
    available: true,
  },
];

const ingredients = [
  { id: 1, nameEn: 'Extra Cheese', nameUa: 'Додатковий сир', price: '2.50', available: true },
  { id: 2, nameEn: 'Pepperoni', nameUa: 'Пепероні', price: '3.00', available: true },
  { id: 3, nameEn: 'Mushrooms', nameUa: 'Гриби', price: '2.00', available: true },
  { id: 4, nameEn: 'Bell Peppers', nameUa: 'Болгарський перець', price: '1.50', available: true },
  { id: 5, nameEn: 'Olives', nameUa: 'Оливки', price: '2.00', available: true },
  { id: 6, nameEn: 'Jalapeños', nameUa: 'Халапеньйо', price: '2.50', available: true },
  { id: 7, nameEn: 'Bacon', nameUa: 'Бекон', price: '3.50', available: true },
  { id: 8, nameEn: 'Pineapple', nameUa: 'Ананас', price: '2.00', available: true },
];

// Routes
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    res.json({ success: true });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.get('/api/pizzas', (req, res) => {
  res.json(pizzas);
});

app.get('/api/pizzas/:id', (req, res) => {
  const pizza = pizzas.find(p => p.id === parseInt(req.params.id));
  if (pizza) {
    res.json(pizza);
  } else {
    res.status(404).json({ error: 'Pizza not found' });
  }
});

app.post('/api/pizzas', (req, res) => {
  const newPizza = { ...req.body, id: pizzas.length + 1 };
  pizzas.push(newPizza);
  res.status(201).json(newPizza);
});

app.put('/api/pizzas/:id', (req, res) => {
  const index = pizzas.findIndex(p => p.id === parseInt(req.params.id));
  if (index !== -1) {
    pizzas[index] = { ...pizzas[index], ...req.body };
    res.json(pizzas[index]);
  } else {
    res.status(404).json({ error: 'Pizza not found' });
  }
});

app.delete('/api/pizzas/:id', (req, res) => {
  const index = pizzas.findIndex(p => p.id === parseInt(req.params.id));
  if (index !== -1) {
    pizzas.splice(index, 1);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Pizza not found' });
  }
});

app.get('/api/ingredients', (req, res) => {
  res.json(ingredients);
});

app.post('/api/ingredients', (req, res) => {
  const newIngredient = { ...req.body, id: ingredients.length + 1 };
  ingredients.push(newIngredient);
  res.status(201).json(newIngredient);
});

// ORDERS - используем файлы!
app.post('/api/orders', (req, res) => {
  const orders = readOrders();
  const newOrder = { 
    ...req.body, 
    id: orders.length + 1, 
    createdAt: new Date().toISOString(), 
    status: 'pending' 
  };
  orders.push(newOrder);
  writeOrders(orders);
  console.log('✅ Order created:', newOrder.id, 'Total:', orders.length);
  res.status(201).json(newOrder);
});

app.get('/api/orders', (req, res) => {
  const orders = readOrders();
  console.log('📦 Getting orders, total:', orders.length);
  res.json(orders);
});

// CONTACTS - используем файлы!
app.post('/api/contacts', (req, res) => {
  const contacts = readContacts();
  const newContact = { 
    ...req.body, 
    id: contacts.length + 1, 
    createdAt: new Date().toISOString() 
  };
  contacts.push(newContact);
  writeContacts(contacts);
  console.log('✅ Contact created:', newContact.id, 'Total:', contacts.length);
  res.status(201).json(newContact);
});

app.get('/api/contacts', (req, res) => {
  const contacts = readContacts();
  console.log('💬 Getting contacts, total:', contacts.length);
  res.json(contacts);
});

export default app;
