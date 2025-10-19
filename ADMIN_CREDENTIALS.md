# 🔐 Учетные данные администратора

## 👤 Данные для входа в админ-панель

### Логин и пароль:
```
Username: admin
Password: admin123
```

### URL админ-панели:
```
http://localhost:5000/admin
или
https://your-deployed-site.com/admin
```

---

## ⚠️ Проблема: "Invalid credentials" на задеплоенном сайте

### Причина:
База данных на сервере пустая - не запущен seed скрипт.

### Решение:

#### Вариант 1: Запустить seed на сервере

**Для Railway:**
```bash
# В настройках проекта добавьте команду:
npm run db:push && npm run seed
```

**Для Render:**
```bash
# В Build Command добавьте:
npm install && npm run build && npm run seed
```

#### Вариант 2: Создать админа вручную через API

Используйте этот скрипт для создания админа:

```bash
# Создайте файл create-admin.js
cat > create-admin.js << 'EOF'
import { db } from './server/db.js';
import { admins } from './shared/schema.js';

async function createAdmin() {
  try {
    await db.insert(admins).values({
      username: 'admin',
      password: 'admin123'
    });
    console.log('✅ Admin created!');
  } catch (error) {
    console.error('❌ Error:', error);
  }
  process.exit(0);
}

createAdmin();
EOF

# Запустите
node create-admin.js
```

#### Вариант 3: Добавить seed в package.json

Обновите `package.json`:

```json
{
  "scripts": {
    "seed": "tsx server/seed.ts",
    "build": "vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist && npm run seed"
  }
}
```

---

## 🔧 Локальный запуск (если работает)

### Если локально работает:

1. **Проверьте базу данных:**
```bash
sqlite3 sqlite.db "SELECT * FROM admins;"
```

Должно показать:
```
1|admin|admin123
```

2. **Если пусто, запустите seed:**
```bash
npm run seed
```

или вручную:
```bash
tsx server/seed.ts
```

---

## 🚀 Для задеплоенного сайта

### Railway:

1. Зайдите в Railway Dashboard
2. Выберите ваш проект
3. Variables → Add Variable:
   ```
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=admin123
   ```
4. Deploy → Redeploy

### Render:

1. Зайдите в Render Dashboard
2. Выберите ваш Web Service
3. Environment → Add Environment Variable:
   ```
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=admin123
   ```
4. Manual Deploy → Deploy latest commit

---

## 🔐 Безопасность

### ⚠️ ВАЖНО для production:

1. **Измените пароль по умолчанию!**
```sql
UPDATE admins SET password = 'your-strong-password' WHERE username = 'admin';
```

2. **Используйте хеширование паролей:**
```bash
npm install bcrypt
```

```typescript
// server/routes.ts
import bcrypt from 'bcrypt';

// При создании админа:
const hashedPassword = await bcrypt.hash('admin123', 10);

// При проверке:
const isValid = await bcrypt.compare(password, admin.password);
```

3. **Используйте переменные окружения:**
```typescript
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
```

---

## 📝 Проверка работы

### Тест входа:

1. Откройте `/admin`
2. Введите:
   - Username: `admin`
   - Password: `admin123`
3. Нажмите "Login"

### Если не работает:

**Проверьте консоль браузера (F12):**
- Есть ли ошибки?
- Какой статус ответа от `/api/admin/login`?

**Проверьте логи сервера:**
```bash
# Railway
railway logs

# Render
# Смотрите в Dashboard → Logs
```

**Проверьте базу данных:**
```bash
# Локально
sqlite3 sqlite.db "SELECT * FROM admins;"

# На сервере (если есть доступ)
railway run sqlite3 sqlite.db "SELECT * FROM admins;"
```

---

## 🆘 Быстрое решение

### Если ничего не помогает:

**Создайте админа через SQL напрямую:**

```bash
# Локально
sqlite3 sqlite.db

# В SQLite консоли:
INSERT INTO admins (username, password) VALUES ('admin', 'admin123');
.quit
```

**Или через код:**

```typescript
// Добавьте в server/index.ts перед запуском сервера:
import { db } from './db';
import { admins } from '@shared/schema';

// Создать админа при старте если не существует
db.insert(admins).values({
  username: 'admin',
  password: 'admin123'
}).onConflictDoNothing().execute();
```

---

## ✅ Итоговый чеклист

- [ ] База данных создана
- [ ] Seed скрипт запущен
- [ ] Админ существует в базе
- [ ] Логин: `admin`
- [ ] Пароль: `admin123`
- [ ] URL: `/admin`
- [ ] Сервер запущен
- [ ] Нет ошибок в консоли

---

## 📞 Если проблема остается

1. Проверьте, что база данных существует
2. Проверьте, что seed запустился
3. Проверьте логи сервера
4. Попробуйте создать админа вручную
5. Проверьте, что API `/api/admin/login` работает

---

**Учетные данные по умолчанию:**
- **Username:** `admin`
- **Password:** `admin123`

**⚠️ Не забудьте изменить пароль в production!**
