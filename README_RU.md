# 🍕 Slice of Heaven - Premium Pizza Website

Полнофункциональный сайт пиццерии с калькулятором заказов, админ-панелью и двуязычным интерфейсом (EN/UA).

## ✨ Возможности

- 🏠 **Главная страница** с hero-секцией и преимуществами
- 📋 **Меню** с фильтрацией по категориям (Classic, Spicy, Vegetarian, Dessert)
- 🧮 **Калькулятор заказа** с выбором размера и дополнительных ингредиентов
- 🛒 **Оформление заказа** с валидацией формы
- ℹ️ **О нас** - история компании
- 📞 **Контакты** с формой обратной связи
- 👨‍💼 **Админ-панель** для управления пиццами
- 🌐 **Двуязычность** (English/Українська)
- 📱 **Адаптивный дизайн** для всех устройств

## 🚀 Быстрый старт

### Установка зависимостей
```bash
npm install
```

### Инициализация базы данных
```bash
# Создать таблицы
npx drizzle-kit push

# Заполнить тестовыми данными
npx tsx server/seed.ts
```

### Запуск сервера разработки
```bash
npm run dev
```

Сайт будет доступен по адресу: **http://localhost:5000**

## 🗄️ База данных

Проект использует **SQLite** для локальной разработки.

### Тестовые данные

**Админ:**
- Username: `admin`
- Password: `admin123`

**Пиццы:**
1. Margherita Classic - $12.99
2. Inferno Diablo - $15.99
3. Garden Paradise - $13.99
4. Chocolate Heaven - $11.99

**Ингредиенты:**
- Extra Cheese - $2.50
- Pepperoni - $3.00
- Mushrooms - $2.00
- Bell Peppers - $1.50
- Olives - $2.00
- Jalapeños - $2.50
- Bacon - $3.50
- Pineapple - $2.00

## 📁 Структура проекта

```
FeedbackFlow/
├── client/                 # Frontend (React + TypeScript)
│   ├── src/
│   │   ├── components/    # UI компоненты
│   │   ├── pages/         # Страницы
│   │   ├── lib/           # Утилиты и хуки
│   │   └── hooks/         # React хуки
│   └── index.html
├── server/                # Backend (Express + TypeScript)
│   ├── db.ts             # Подключение к БД
│   ├── routes.ts         # API маршруты
│   ├── storage.ts        # Слой работы с данными
│   └── seed.ts           # Заполнение БД
├── shared/               # Общие типы и схемы
│   └── schema.ts         # Drizzle ORM схемы
└── sqlite.db            # База данных SQLite
```

## 🛠️ Технологии

### Frontend
- **React 18** - UI библиотека
- **TypeScript** - типизация
- **Wouter** - роутинг
- **TanStack Query** - управление состоянием сервера
- **React Hook Form** - работа с формами
- **Zod** - валидация
- **Tailwind CSS** - стилизация
- **shadcn/ui** - UI компоненты
- **Lucide React** - иконки

### Backend
- **Express** - веб-сервер
- **TypeScript** - типизация
- **Drizzle ORM** - работа с БД
- **Better-SQLite3** - SQLite драйвер
- **Vite** - сборка и dev-сервер

## 📄 API Endpoints

### Pizzas
- `GET /api/pizzas` - Получить все пиццы
- `GET /api/pizzas/:id` - Получить пиццу по ID
- `POST /api/pizzas` - Создать пиццу (требуется админ)
- `PUT /api/pizzas/:id` - Обновить пиццу (требуется админ)
- `DELETE /api/pizzas/:id` - Удалить пиццу (требуется админ)

### Ingredients
- `GET /api/ingredients` - Получить все ингредиенты
- `POST /api/ingredients` - Создать ингредиент (требуется админ)

### Orders
- `POST /api/orders` - Создать заказ
- `GET /api/orders` - Получить все заказы (требуется админ)

### Contacts
- `POST /api/contacts` - Отправить сообщение

### Admin
- `POST /api/admin/login` - Вход в админ-панель

## 🎨 Дизайн

Сайт использует современный дизайн с:
- Градиентами (красный/оранжевый)
- Анимациями при наведении
- Адаптивной версткой
- Темной/светлой темой (через shadcn/ui)
- Кастомными шрифтами (Bebas Neue, Inter, Poppins, Playfair Display)

## 📝 Скрипты

```bash
npm run dev        # Запуск dev-сервера
npm run build      # Сборка для production
npm run start      # Запуск production сервера
npm run check      # Проверка TypeScript
npm run db:push    # Применить изменения схемы БД
```

## 🔧 Исправленные проблемы

1. ✅ Добавлен компонент Footer
2. ✅ Переход с PostgreSQL на SQLite
3. ✅ Исправлены ошибки с `import.meta.dirname` (Node.js 18)
4. ✅ Адаптация схемы для SQLite
5. ✅ Исправлена работа с массивами в SQLite (JSON строки)
6. ✅ Инициализация БД с тестовыми данными

## 📞 Поддержка

Если возникли проблемы:
1. Убедитесь, что установлены зависимости: `npm install`
2. Проверьте, что БД инициализирована: `npx tsx server/seed.ts`
3. Проверьте логи сервера в консоли

---

**Приятного использования! 🍕**
