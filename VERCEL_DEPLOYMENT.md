# 🚀 Vercel Deployment Guide

## ⚠️ Проблема

Vercel показывает серверный код вместо фронтенда из-за:
1. SQLite не поддерживается на Vercel (serverless)
2. Неправильная конфигурация build

## ✅ Решение 1: Deploy только Frontend (Рекомендуется)

### Шаг 1: Создайте отдельный build для frontend

```bash
# В корне проекта
npm run build
```

### Шаг 2: Настройте Vercel

Создайте `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist/public",
  "framework": null,
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Шаг 3: Deploy

```bash
vercel --prod
```

**Проблема:** Backend не будет работать (нет API)

---

## ✅ Решение 2: Deploy на другую платформу (Лучше)

### Рекомендуемые платформы для Full-Stack:

#### 1. **Railway** (Рекомендуется) ⭐
- ✅ Поддерживает SQLite
- ✅ Поддерживает Node.js
- ✅ Бесплатный tier
- ✅ Простой deploy

**Как задеплоить:**
```bash
# 1. Установите Railway CLI
npm i -g @railway/cli

# 2. Login
railway login

# 3. Deploy
railway up
```

**Или через GitHub:**
1. https://railway.app/new
2. Deploy from GitHub repo
3. Выберите ваш репозиторий
4. Railway автоматически определит настройки
5. Deploy!

#### 2. **Render** ⭐
- ✅ Поддерживает SQLite
- ✅ Бесплатный tier
- ✅ Auto-deploy from GitHub

**Как задеплоить:**
1. https://render.com/
2. New → Web Service
3. Connect GitHub repo
4. Build Command: `npm run build`
5. Start Command: `npm start`
6. Deploy!

#### 3. **Fly.io** ⭐
- ✅ Поддерживает SQLite
- ✅ Persistent storage
- ✅ Бесплатный tier

**Как задеплоить:**
```bash
# 1. Установите Fly CLI
curl -L https://fly.io/install.sh | sh

# 2. Login
fly auth login

# 3. Launch
fly launch

# 4. Deploy
fly deploy
```

---

## ✅ Решение 3: Migrate to PostgreSQL для Vercel

Если хотите использовать Vercel, нужно мигрировать с SQLite на PostgreSQL.

### Шаг 1: Создайте PostgreSQL на Vercel

```bash
vercel postgres create
```

### Шаг 2: Обновите database config

```typescript
// server/db.ts
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const connectionString = process.env.POSTGRES_URL!;
const client = postgres(connectionString);
export const db = drizzle(client, { schema });
```

### Шаг 3: Обновите dependencies

```bash
npm install postgres drizzle-orm
npm uninstall better-sqlite3
```

### Шаг 4: Обновите schema для PostgreSQL

```typescript
// shared/schema.ts
import { pgTable, serial, text, timestamp, boolean } from 'drizzle-orm/pg-core';

export const pizzas = pgTable('pizzas', {
  id: serial('id').primaryKey(),
  // ... остальные поля
});
```

**Это требует много изменений!**

---

## 📋 Сравнение платформ

| Платформа | SQLite | Free Tier | Auto Deploy | Сложность |
|-----------|--------|-----------|-------------|-----------|
| **Railway** | ✅ | ✅ | ✅ | ⭐ Легко |
| **Render** | ✅ | ✅ | ✅ | ⭐ Легко |
| **Fly.io** | ✅ | ✅ | ✅ | ⭐⭐ Средне |
| **Vercel** | ❌ | ✅ | ✅ | ⭐⭐⭐ Сложно |
| **Netlify** | ❌ | ✅ | ✅ | ⭐⭐⭐ Сложно |

---

## 🎯 Рекомендация: Railway

### Почему Railway:
1. ✅ Поддерживает SQLite из коробки
2. ✅ Простой deploy (один клик)
3. ✅ Автоматический deploy из GitHub
4. ✅ Бесплатный tier (500 часов/месяц)
5. ✅ Persistent storage для SQLite
6. ✅ Environment variables
7. ✅ Логи и мониторинг

### Быстрый deploy на Railway:

```bash
# Вариант 1: Через CLI
npm i -g @railway/cli
railway login
railway up

# Вариант 2: Через GitHub (проще)
1. https://railway.app/new
2. Deploy from GitHub repo
3. Выберите: admine112/Slice-of-Heaven
4. Railway автоматически:
   - Определит Node.js проект
   - Установит зависимости
   - Запустит npm run build
   - Запустит npm start
5. Готово! 🎉
```

### После deploy:
1. Railway даст вам URL: `https://your-app.railway.app`
2. Добавьте environment variables если нужно
3. SQLite база будет работать автоматически

---

## 🔧 Исправление текущего Vercel deploy

### Проблема:
Vercel показывает содержимое `dist/index.js` вместо HTML.

### Временное решение:

1. **Удалите текущий deploy на Vercel**

2. **Создайте новый vercel.json:**

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist/public",
  "installCommand": "npm install",
  "framework": null,
  "routes": [
    {
      "handle": "filesystem"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

3. **Redeploy:**

```bash
vercel --prod
```

**Но помните:** API не будет работать на Vercel без PostgreSQL!

---

## 📝 Итоговая рекомендация

### Для вашего проекта:

**Используйте Railway:**

```bash
# 1. Зайдите на https://railway.app
# 2. Sign in with GitHub
# 3. New Project → Deploy from GitHub repo
# 4. Выберите: admine112/Slice-of-Heaven
# 5. Deploy!
```

**Преимущества:**
- ✅ Работает из коробки
- ✅ SQLite поддерживается
- ✅ Все API работают
- ✅ Автоматический deploy при push
- ✅ Бесплатно

**Vercel лучше использовать для:**
- Frontend-only проекты
- Next.js приложения
- Проекты с PostgreSQL/MySQL

---

## 🚀 Следующие шаги

1. **Deploy на Railway** (5 минут)
2. Получите URL вашего приложения
3. Обновите README с live demo
4. Добавьте badge в README:

```markdown
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/admine112/Slice-of-Heaven)
```

---

**Railway - лучший выбор для вашего проекта!** 🚂✨
