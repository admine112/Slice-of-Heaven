// Vercel Serverless Function
import express from 'express';

const app = express();
app.use(express.json());

// Simple auth
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

// ГЛОБАЛЬНОЕ хранилище данных (сохраняется между запросами)
if (!global.pizzas) {
  global.pizzas = [
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
}

if (!global.ingredients) {
  global.ingredients = [
  { id: 1, nameEn: 'Extra Cheese', nameUa: 'Додатковий сир', price: '2.50', available: true },
  { id: 2, nameEn: 'Pepperoni', nameUa: 'Пепероні', price: '3.00', available: true },
  { id: 3, nameEn: 'Mushrooms', nameUa: 'Гриби', price: '2.00', available: true },
  { id: 4, nameEn: 'Bell Peppers', nameUa: 'Болгарський перець', price: '1.50', available: true },
  { id: 5, nameEn: 'Olives', nameUa: 'Оливки', price: '2.00', available: true },
  { id: 6, nameEn: 'Jalapeños', nameUa: 'Халапеньйо', price: '2.50', available: true },
  { id: 7, nameEn: 'Bacon', nameUa: 'Бекон', price: '3.50', available: true },
  { id: 8, nameEn: 'Pineapple', nameUa: 'Ананас', price: '2.00', available: true },
];
}

if (!global.orders) {
  global.orders = [];
}

if (!global.contacts) {
  global.contacts = [];
}

if (!global.nextOrderId) {
  global.nextOrderId = 1;
}

if (!global.nextContactId) {
  global.nextContactId = 1;
}

// Routes - ВСЕГДА используем global напрямую!
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    res.json({ success: true });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.get('/api/pizzas', (req, res) => {
  res.json(global.pizzas);
});

app.get('/api/pizzas/:id', (req, res) => {
  const pizza = global.pizzas.find(p => p.id === parseInt(req.params.id));
  if (pizza) {
    res.json(pizza);
  } else {
    res.status(404).json({ error: 'Pizza not found' });
  }
});

app.post('/api/pizzas', (req, res) => {
  const newPizza = { ...req.body, id: global.pizzas.length + 1 };
  global.pizzas.push(newPizza);
  res.status(201).json(newPizza);
});

app.put('/api/pizzas/:id', (req, res) => {
  const index = global.pizzas.findIndex(p => p.id === parseInt(req.params.id));
  if (index !== -1) {
    global.pizzas[index] = { ...global.pizzas[index], ...req.body };
    res.json(global.pizzas[index]);
  } else {
    res.status(404).json({ error: 'Pizza not found' });
  }
});

app.delete('/api/pizzas/:id', (req, res) => {
  const index = global.pizzas.findIndex(p => p.id === parseInt(req.params.id));
  if (index !== -1) {
    global.pizzas.splice(index, 1);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Pizza not found' });
  }
});

app.get('/api/ingredients', (req, res) => {
  res.json(global.ingredients);
});

app.post('/api/ingredients', (req, res) => {
  const newIngredient = { ...req.body, id: global.ingredients.length + 1 };
  global.ingredients.push(newIngredient);
  res.status(201).json(newIngredient);
});

app.post('/api/orders', (req, res) => {
  const newOrder = { 
    ...req.body, 
    id: global.nextOrderId++, 
    createdAt: new Date().toISOString(), 
    status: 'pending' 
  };
  global.orders.push(newOrder);
  console.log('Order created:', newOrder.id, 'Total orders:', global.orders.length);
  res.status(201).json(newOrder);
});

app.get('/api/orders', (req, res) => {
  console.log('Getting orders, total:', global.orders.length);
  res.json(global.orders);
});

app.post('/api/contacts', (req, res) => {
  const newContact = { 
    ...req.body, 
    id: global.nextContactId++, 
    createdAt: new Date().toISOString() 
  };
  global.contacts.push(newContact);
  console.log('Contact created:', newContact.id, 'Total contacts:', global.contacts.length);
  res.status(201).json(newContact);
});

app.get('/api/contacts', (req, res) => {
  console.log('Getting contacts, total:', global.contacts.length);
  res.json(global.contacts);
});

export default app;
