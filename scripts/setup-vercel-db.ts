import postgres from 'postgres';

const connectionString = process.env.POSTGRES_URL;

if (!connectionString) {
  console.error('❌ POSTGRES_URL not found!');
  console.log('Please set up Vercel Postgres:');
  console.log('1. Go to your Vercel project');
  console.log('2. Storage → Create Database → Postgres');
  console.log('3. Vercel will automatically add POSTGRES_URL');
  process.exit(1);
}

const sql = postgres(connectionString);

async function setupDatabase() {
  console.log('🚀 Setting up Vercel Postgres database...');

  try {
    // Create tables
    await sql`
      CREATE TABLE IF NOT EXISTS admins (
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      )
    `;
    console.log('✅ Created admins table');

    await sql`
      CREATE TABLE IF NOT EXISTS pizzas (
        id SERIAL PRIMARY KEY,
        name_en TEXT NOT NULL,
        name_ua TEXT NOT NULL,
        description_en TEXT NOT NULL,
        description_ua TEXT NOT NULL,
        category TEXT NOT NULL,
        price TEXT NOT NULL,
        image_url TEXT NOT NULL,
        available BOOLEAN DEFAULT true NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `;
    console.log('✅ Created pizzas table');

    await sql`
      CREATE TABLE IF NOT EXISTS ingredients (
        id SERIAL PRIMARY KEY,
        name_en TEXT NOT NULL,
        name_ua TEXT NOT NULL,
        price TEXT NOT NULL,
        available BOOLEAN DEFAULT true NOT NULL
      )
    `;
    console.log('✅ Created ingredients table');

    await sql`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        customer_name TEXT NOT NULL,
        customer_email TEXT NOT NULL,
        customer_phone TEXT NOT NULL,
        delivery_address TEXT NOT NULL,
        pizza_id INTEGER NOT NULL,
        size TEXT NOT NULL,
        extra_ingredients TEXT NOT NULL,
        total_price TEXT NOT NULL,
        status TEXT DEFAULT 'pending' NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `;
    console.log('✅ Created orders table');

    await sql`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `;
    console.log('✅ Created contacts table');

    // Seed admin user
    await sql`
      INSERT INTO admins (username, password)
      VALUES ('admin', 'admin123')
      ON CONFLICT (username) DO NOTHING
    `;
    console.log('✅ Created admin user (admin/admin123)');

    // Seed pizzas
    const pizzas = [
      {
        nameEn: 'Margherita Classic',
        nameUa: 'Маргарита Класична',
        descriptionEn: 'Fresh mozzarella, tomato sauce, basil, and olive oil',
        descriptionUa: 'Свіжа моцарела, томатний соус, базилік та оливкова олія',
        category: 'classic',
        price: '12.99',
        imageUrl: '/attached_assets/generated_images/Classic_margherita_pizza_photo_05343f97.png',
      },
      {
        nameEn: 'Inferno Diablo',
        nameUa: 'Пекельний Діабло',
        descriptionEn: 'Spicy pepperoni, jalapeños, hot chili peppers',
        descriptionUa: 'Гостра пепероні, халапеньйо, гострий чилі',
        category: 'spicy',
        price: '15.99',
        imageUrl: '/attached_assets/generated_images/Spicy_diablo_pizza_photo_c5e8a9d3.png',
      },
      {
        nameEn: 'Garden Paradise',
        nameUa: 'Райський Сад',
        descriptionEn: 'Bell peppers, mushrooms, olives, tomatoes',
        descriptionUa: 'Болгарський перець, гриби, оливки, помідори',
        category: 'vegetarian',
        price: '13.99',
        imageUrl: '/attached_assets/generated_images/Vegetarian_garden_pizza_photo_7a2b4e91.png',
      },
      {
        nameEn: 'Chocolate Heaven',
        nameUa: 'Шоколадний Рай',
        descriptionEn: 'Nutella, strawberries, powdered sugar',
        descriptionUa: 'Нутелла, полуниця, цукрова пудра',
        category: 'dessert',
        price: '11.99',
        imageUrl: '/attached_assets/generated_images/Dessert_chocolate_pizza_photo_e383cb23.png',
      },
    ];

    for (const pizza of pizzas) {
      await sql`
        INSERT INTO pizzas (name_en, name_ua, description_en, description_ua, category, price, image_url, available)
        VALUES (${pizza.nameEn}, ${pizza.nameUa}, ${pizza.descriptionEn}, ${pizza.descriptionUa}, ${pizza.category}, ${pizza.price}, ${pizza.imageUrl}, true)
        ON CONFLICT DO NOTHING
      `;
    }
    console.log('✅ Created sample pizzas');

    // Seed ingredients
    const ingredients = [
      { nameEn: 'Extra Cheese', nameUa: 'Додатковий сир', price: '2.50' },
      { nameEn: 'Pepperoni', nameUa: 'Пепероні', price: '3.00' },
      { nameEn: 'Mushrooms', nameUa: 'Гриби', price: '2.00' },
      { nameEn: 'Bell Peppers', nameUa: 'Болгарський перець', price: '1.50' },
      { nameEn: 'Olives', nameUa: 'Оливки', price: '2.00' },
      { nameEn: 'Jalapeños', nameUa: 'Халапеньйо', price: '2.50' },
      { nameEn: 'Bacon', nameUa: 'Бекон', price: '3.50' },
      { nameEn: 'Pineapple', nameUa: 'Ананас', price: '2.00' },
    ];

    for (const ingredient of ingredients) {
      await sql`
        INSERT INTO ingredients (name_en, name_ua, price, available)
        VALUES (${ingredient.nameEn}, ${ingredient.nameUa}, ${ingredient.price}, true)
        ON CONFLICT DO NOTHING
      `;
    }
    console.log('✅ Created sample ingredients');

    console.log('\n🎉 Database setup completed!');
    console.log('\n📝 Admin credentials:');
    console.log('   Username: admin');
    console.log('   Password: admin123');
    
  } catch (error) {
    console.error('❌ Setup failed:', error);
    throw error;
  } finally {
    await sql.end();
  }
}

setupDatabase();
