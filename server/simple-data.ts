// Простое хранилище данных в памяти (без базы данных)

export const pizzas = [
  {
    id: 1,
    nameEn: 'Margherita Classic',
    nameUa: 'Маргарита Класична',
    descriptionEn: 'Fresh mozzarella, tomato sauce, basil, and olive oil on a perfectly crispy crust',
    descriptionUa: 'Свіжа моцарела, томатний соус, базилік та оливкова олія на ідеально хрусткій основі',
    category: 'classic',
    price: '12.99',
    imageUrl: '/attached_assets/generated_images/Classic_margherita_pizza_photo_05343f97.png',
    available: true,
  },
  {
    id: 2,
    nameEn: 'Inferno Diablo',
    nameUa: 'Пекельний Діабло',
    descriptionEn: 'Spicy pepperoni, jalapeños, hot chili peppers, and our signature fire sauce',
    descriptionUa: 'Гостра пепероні, халапеньйо, гострий чилі та наш фірмовий вогняний соус',
    category: 'spicy',
    price: '15.99',
    imageUrl: '/attached_assets/generated_images/Spicy_diablo_pizza_photo_c5e8a9d3.png',
    available: true,
  },
  {
    id: 3,
    nameEn: 'Garden Paradise',
    nameUa: 'Райський Сад',
    descriptionEn: 'Bell peppers, mushrooms, olives, tomatoes, and fresh vegetables',
    descriptionUa: 'Болгарський перець, гриби, оливки, помідори та свіжі овочі',
    category: 'vegetarian',
    price: '13.99',
    imageUrl: '/attached_assets/generated_images/Vegetarian_garden_pizza_photo_7a2b4e91.png',
    available: true,
  },
  {
    id: 4,
    nameEn: 'Chocolate Heaven',
    nameUa: 'Шоколадний Рай',
    descriptionEn: 'Nutella spread, fresh strawberries, powdered sugar, and a touch of cream',
    descriptionUa: 'Нутелла, свіжа полуниця, цукрова пудра та крем',
    category: 'dessert',
    price: '11.99',
    imageUrl: '/attached_assets/generated_images/Dessert_chocolate_pizza_photo_e383cb23.png',
    available: true,
  },
];

export const ingredients = [
  { id: 1, nameEn: 'Extra Cheese', nameUa: 'Додатковий сир', price: '2.50', available: true },
  { id: 2, nameEn: 'Pepperoni', nameUa: 'Пепероні', price: '3.00', available: true },
  { id: 3, nameEn: 'Mushrooms', nameUa: 'Гриби', price: '2.00', available: true },
  { id: 4, nameEn: 'Bell Peppers', nameUa: 'Болгарський перець', price: '1.50', available: true },
  { id: 5, nameEn: 'Olives', nameUa: 'Оливки', price: '2.00', available: true },
  { id: 6, nameEn: 'Jalapeños', nameUa: 'Халапеньйо', price: '2.50', available: true },
  { id: 7, nameEn: 'Bacon', nameUa: 'Бекон', price: '3.50', available: true },
  { id: 8, nameEn: 'Pineapple', nameUa: 'Ананас', price: '2.00', available: true },
];

export const orders: any[] = [];
export const contacts: any[] = [];

let nextOrderId = 1;
let nextContactId = 1;

export function addOrder(order: any) {
  const newOrder = { ...order, id: nextOrderId++, createdAt: new Date() };
  orders.push(newOrder);
  return newOrder;
}

export function addContact(contact: any) {
  const newContact = { ...contact, id: nextContactId++, createdAt: new Date() };
  contacts.push(newContact);
  return newContact;
}

export function addPizza(pizza: any) {
  const newPizza = { ...pizza, id: pizzas.length + 1, createdAt: new Date() };
  pizzas.push(newPizza);
  return newPizza;
}

export function updatePizza(id: number, data: any) {
  const index = pizzas.findIndex(p => p.id === id);
  if (index !== -1) {
    pizzas[index] = { ...pizzas[index], ...data };
    return pizzas[index];
  }
  return null;
}

export function deletePizza(id: number) {
  const index = pizzas.findIndex(p => p.id === id);
  if (index !== -1) {
    pizzas.splice(index, 1);
    return true;
  }
  return false;
}
