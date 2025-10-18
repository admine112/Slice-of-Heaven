import { db } from './db';
import { admins, pizzas, ingredients } from '@shared/schema';

async function seed() {
  console.log('🌱 Seeding database...');

  // Create admin user (username: admin, password: admin123)
  await db.insert(admins).values({
    username: 'admin',
    password: 'admin123', // In production, use hashed passwords
  }).onConflictDoNothing();
  console.log('✅ Admin user created');

  // Create sample pizzas
  const samplePizzas = [
    {
      nameEn: 'Margherita Classic',
      nameUa: 'Маргарита Класична',
      descriptionEn: 'Fresh mozzarella, tomato sauce, basil, and olive oil on a perfectly crispy crust',
      descriptionUa: 'Свіжа моцарела, томатний соус, базилік та оливкова олія на ідеально хрусткій основі',
      category: 'classic',
      price: '12.99',
      imageUrl: '/attached_assets/generated_images/pizza_slice_icon.png',
      available: true,
    },
    {
      nameEn: 'Inferno Diablo',
      nameUa: 'Пекельний Діабло',
      descriptionEn: 'Spicy pepperoni, jalapeños, hot chili peppers, and our signature fire sauce',
      descriptionUa: 'Гостра пепероні, халапеньйо, гострий чилі та наш фірмовий вогняний соус',
      category: 'spicy',
      price: '15.99',
      imageUrl: '/attached_assets/generated_images/pizza_slice_icon.png',
      available: true,
    },
    {
      nameEn: 'Garden Paradise',
      nameUa: 'Райський Сад',
      descriptionEn: 'Bell peppers, mushrooms, olives, tomatoes, and fresh vegetables',
      descriptionUa: 'Болгарський перець, гриби, оливки, помідори та свіжі овочі',
      category: 'vegetarian',
      price: '13.99',
      imageUrl: '/attached_assets/generated_images/pizza_slice_icon.png',
      available: true,
    },
    {
      nameEn: 'Chocolate Heaven',
      nameUa: 'Шоколадний Рай',
      descriptionEn: 'Nutella spread, fresh strawberries, powdered sugar, and a touch of cream',
      descriptionUa: 'Нутелла, свіжа полуниця, цукрова пудра та крем',
      category: 'dessert',
      price: '11.99',
      imageUrl: '/attached_assets/generated_images/pizza_slice_icon.png',
      available: true,
    },
  ];

  for (const pizza of samplePizzas) {
    await db.insert(pizzas).values(pizza).onConflictDoNothing();
  }
  console.log('✅ Sample pizzas created');

  // Create sample ingredients
  const sampleIngredients = [
    { nameEn: 'Extra Cheese', nameUa: 'Додатковий сир', price: '2.50', available: true },
    { nameEn: 'Pepperoni', nameUa: 'Пепероні', price: '3.00', available: true },
    { nameEn: 'Mushrooms', nameUa: 'Гриби', price: '2.00', available: true },
    { nameEn: 'Bell Peppers', nameUa: 'Болгарський перець', price: '1.50', available: true },
    { nameEn: 'Olives', nameUa: 'Оливки', price: '2.00', available: true },
    { nameEn: 'Jalapeños', nameUa: 'Халапеньйо', price: '2.50', available: true },
    { nameEn: 'Bacon', nameUa: 'Бекон', price: '3.50', available: true },
    { nameEn: 'Pineapple', nameUa: 'Ананас', price: '2.00', available: true },
  ];

  for (const ingredient of sampleIngredients) {
    await db.insert(ingredients).values(ingredient).onConflictDoNothing();
  }
  console.log('✅ Sample ingredients created');

  console.log('🎉 Database seeding completed!');
  process.exit(0);
}

seed().catch((error) => {
  console.error('❌ Seeding failed:', error);
  process.exit(1);
});
