# 🚀 Настройка Vercel с PostgreSQL - Готово!

## ✅ Что я сделал:

1. ✅ Установил `@vercel/postgres` и `postgres`
2. ✅ Создал `server/db-postgres.ts` - автоматически переключается между PostgreSQL и SQLite
3. ✅ Создал `shared/schema-postgres.ts` - PostgreSQL версия схемы
4. ✅ Создал `scripts/setup-vercel-db.ts` - автоматическая настройка базы
5. ✅ Обновил `package.json` с командой `vercel-build`

---

## 📋 Что нужно сделать ВАМ (5 минут):

### Шаг 1: Создайте Postgres базу на Vercel

1. Откройте https://vercel.com/dashboard
2. Выберите ваш проект `Slice-of-Heaven`
3. Перейдите в **Storage** → **Create Database**
4. Выберите **Postgres**
5. Нажмите **Create**
6. Vercel автоматически добавит переменную `POSTGRES_URL`

### Шаг 2: Настройте Build Command

1. В Vercel проекте: **Settings** → **General**
2. Найдите **Build & Development Settings**
3. **Build Command**: измените на `npm run vercel-build`
4. **Output Directory**: оставьте `dist/public`
5. Сохраните

### Шаг 3: Redeploy

1. **Deployments** → **...** (три точки) → **Redeploy**
2. Или просто push в GitHub - Vercel автоматически задеплоит

---

## 🎯 Что произойдет автоматически:

1. Vercel запустит `npm run vercel-build`
2. Соберется frontend и backend
3. Запустится `setup-vercel-db.ts`
4. Создадутся все таблицы
5. Создастся админ: **admin / admin123**
6. Создадутся пиццы и ингредиенты
7. Сайт заработает! 🎉

---

## 🔐 Вход в админ-панель:

После деплоя:
- URL: `https://your-site.vercel.app/admin`
- Username: `admin`
- Password: `admin123`

---

## 📝 Альтернативный способ (если не хотите менять Build Command):

### Добавьте в vercel.json:

```json
{
  "buildCommand": "npm run vercel-build"
}
```

Я могу это сделать за вас - скажите!

---

## 🔄 Локальная разработка:

Локально будет использоваться SQLite (как раньше):
```bash
npm run dev
# ✅ Connected to SQLite (local)
```

На Vercel автоматически PostgreSQL:
```bash
# ✅ Connected to PostgreSQL
```

---

## ⚡ Быстрый чеклист:

- [ ] Создали Postgres на Vercel (Storage → Create Database)
- [ ] Изменили Build Command на `npm run vercel-build`
- [ ] Redeploy проекта
- [ ] Проверили `/admin` - вход работает!

---

## 🆘 Если что-то не работает:

### Проверьте логи деплоя:
1. Vercel Dashboard → Deployments → последний deploy
2. Смотрите логи - должно быть:
   ```
   ✅ Created admins table
   ✅ Created pizzas table
   ✅ Created admin user (admin/admin123)
   🎉 Database setup completed!
   ```

### Проверьте переменные:
1. Settings → Environment Variables
2. Должна быть `POSTGRES_URL` (добавляется автоматически)

---

## 📤 Готово к push!

Я сейчас залью все изменения на GitHub:
- Vercel автоматически подхватит
- Но сначала создайте Postgres базу!

**Готовы? Скажите "залей" и я push'ну на GitHub!** 🚀
