# 🍕 Slice of Heaven - Premium Pizza Delivery

<div align="center">

![Pizza Logo](./attached_assets/generated_images/Pizza_logo_icon_orange_58b11467.png)

**Modern, Full-Stack Pizza Ordering Platform**

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)](https://www.sqlite.org/)

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Tech Stack](#-tech-stack) • [Documentation](#-documentation)

</div>

---

## 📖 About

**Slice of Heaven** is a modern, full-featured pizza ordering platform built with React, TypeScript, and Node.js. It features a beautiful UI, multilingual support (English/Ukrainian), real-time order tracking, and a comprehensive admin panel.

### ✨ Key Highlights

- 🌍 **Bilingual Interface** - English & Ukrainian with instant switching
- 🛒 **Smart Calculator** - Interactive pizza customization with real-time pricing
- 📧 **Email Notifications** - Automatic order confirmations via Formspree
- 👨‍💼 **Admin Dashboard** - Full CRUD operations for pizzas, orders, and messages
- 📱 **Fully Responsive** - Perfect experience on mobile, tablet, and desktop
- 🎨 **Modern UI** - Built with Tailwind CSS and shadcn/ui components
- 🖼️ **Image Upload** - Easy pizza image management with preview
- 🔢 **Order Tracking** - Unique order numbers for each purchase

---

## 🎯 Features

### For Customers

#### 🍕 Pizza Menu
- Browse 4 delicious pizza varieties
- Filter by category (Classic, Spicy, Vegetarian, Dessert)
- View detailed descriptions and prices
- Beautiful card-based layout with images

#### 🧮 Order Calculator
- **Pizza Selection** - Choose from available pizzas
- **Size Options** - Small (8"), Medium (12"), Large (16")
- **Extra Toppings** - 8 additional ingredients to customize
- **Real-time Pricing** - See total cost update instantly
- **Order Summary** - Clear breakdown of your order

#### 📦 Checkout Process
- Simple form with validation
- Customer details (name, email, phone)
- Delivery address input
- Order confirmation with unique number
- Email notification with order details

#### 🌐 Multilingual Support
- 🇬🇧 English
- 🇺🇦 Ukrainian
- Instant language switching
- Persistent language preference

### For Administrators

#### 🔐 Admin Panel (`/admin`)
**Login:** `admin` / **Password:** `admin123`

##### Pizza Management
- ✅ Create new pizzas
- ✏️ Edit existing pizzas
- 🗑️ Delete pizzas
- 🖼️ Upload images with preview
- 💰 Set prices and availability
- 🌍 Bilingual names and descriptions

##### Order Management
- 📋 View all orders
- 👤 Customer information
- 📍 Delivery addresses
- 💵 Order totals
- 🔢 Order numbers
- 📅 Timestamps

##### Message Management
- 💬 View contact form submissions
- 📧 Customer emails
- 📝 Message content
- 📅 Submission dates

---

## 🎬 Demo

### Customer Experience

```
Home → Menu → Calculator → Checkout → Order Confirmation
```

1. **Browse Menu** - View all available pizzas
2. **Customize Order** - Select size and toppings
3. **Checkout** - Enter delivery details
4. **Confirmation** - Receive order number and email

### Admin Experience

```
Login → Dashboard → Manage (Pizzas/Orders/Messages)
```

1. **Secure Login** - Admin authentication
2. **Tabbed Interface** - Easy navigation
3. **CRUD Operations** - Full control over content
4. **Real-time Updates** - Instant data refresh

---

## 🚀 Installation

### Prerequisites

- Node.js 18+ (recommended: 20.x or 22.x)
- npm 9+
- Git

### Quick Start

```bash
# Clone the repository
git clone https://github.com/admine112/Slice-of-Heaven.git
cd Slice-of-Heaven

# Install dependencies
npm install

# Run development server
npm run dev

# Open in browser
http://localhost:5000
```

### Build for Production

```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose |
|------------|---------|
| **React 18** | UI framework |
| **TypeScript** | Type safety |
| **Vite** | Build tool & dev server |
| **Wouter** | Lightweight routing |
| **TanStack Query** | Data fetching & caching |
| **React Hook Form** | Form management |
| **Zod** | Schema validation |
| **Tailwind CSS** | Styling |
| **shadcn/ui** | UI components |
| **Lucide React** | Icons |

### Backend

| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime environment |
| **Express** | Web framework |
| **SQLite** | Database |
| **Drizzle ORM** | Database toolkit |
| **Multer** | File uploads |
| **Formspree** | Email service |

### Development

| Tool | Purpose |
|------|---------|
| **ESLint** | Code linting |
| **Prettier** | Code formatting |
| **TypeScript** | Type checking |

---

## 📁 Project Structure

```
Slice-of-Heaven/
├── client/                    # Frontend application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── ui/          # shadcn/ui components
│   │   │   ├── Header.tsx   # Navigation header
│   │   │   └── Footer.tsx   # Site footer
│   │   ├── pages/           # Page components
│   │   │   ├── Home.tsx     # Landing page
│   │   │   ├── Menu.tsx     # Pizza menu
│   │   │   ├── Calculator.tsx # Order builder
│   │   │   ├── Checkout.tsx # Order form
│   │   │   ├── About.tsx    # About page
│   │   │   ├── Contact.tsx  # Contact form
│   │   │   └── Admin.tsx    # Admin panel
│   │   ├── lib/             # Utilities
│   │   │   ├── i18n.tsx     # Internationalization
│   │   │   └── queryClient.ts # API client
│   │   ├── hooks/           # Custom hooks
│   │   └── App.tsx          # Root component
│   └── index.html           # HTML entry point
│
├── server/                   # Backend application
│   ├── routes.ts            # API endpoints
│   ├── storage.ts           # Database operations
│   ├── db.ts                # Database connection
│   ├── seed.ts              # Initial data
│   └── vite.ts              # Vite integration
│
├── shared/                   # Shared code
│   └── schema.ts            # Database schema & validation
│
├── attached_assets/         # Static files
│   ├── generated_images/    # Pizza images
│   └── uploads/             # User uploads
│
├── sqlite.db                # SQLite database
├── package.json             # Dependencies
├── vite.config.ts           # Vite configuration
├── drizzle.config.ts        # Drizzle ORM config
└── README.md                # This file
```

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Server
PORT=5000

# Database
DATABASE_URL=./sqlite.db

# Admin Credentials (change in production!)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

### Formspree Setup

1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form
3. Update the form ID in:
   - `client/src/pages/Checkout.tsx`
   - `client/src/pages/Contact.tsx`

```typescript
// Replace with your Formspree form ID
await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  // ...
});
```

---

## 📚 Documentation

Comprehensive guides are available in the repository:

| Document | Description |
|----------|-------------|
| [QUICK_START.md](./QUICK_START.md) | Quick start guide |
| [ADMIN_GUIDE.md](./ADMIN_GUIDE.md) | Admin panel usage |
| [MULTILINGUAL_GUIDE.md](./MULTILINGUAL_GUIDE.md) | Language features |
| [IMAGE_UPLOAD_GUIDE.md](./IMAGE_UPLOAD_GUIDE.md) | Image management |
| [UI_IMPROVEMENTS.md](./UI_IMPROVEMENTS.md) | UI enhancements |
| [BUGFIXES.md](./BUGFIXES.md) | Bug fixes & solutions |

---

## 🎨 Features in Detail

### 1. Multilingual Support

- **Instant Switching** - Toggle between English and Ukrainian
- **Persistent Preference** - Language choice saved in localStorage
- **Complete Translation** - All UI elements translated
- **Dynamic Content** - Pizza names and descriptions in both languages

### 2. Order Calculator

- **Interactive UI** - Visual pizza selection
- **Size Selection** - 3 sizes with diameter display
- **Toppings** - 8 extra ingredients with individual pricing
- **Live Total** - Price updates in real-time
- **Responsive Design** - Optimized for all screen sizes

### 3. Admin Dashboard

- **Tabbed Interface** - Pizzas, Orders, Messages
- **Pizza Management**
  - Add/Edit/Delete pizzas
  - Upload images with preview
  - Set prices and availability
  - Bilingual content
- **Order Tracking**
  - View all orders
  - Customer details
  - Order status
- **Message Inbox**
  - Contact form submissions
  - Customer inquiries

### 4. Email Notifications

- **Order Confirmations** - Sent to customers
- **Order Alerts** - Sent to admin
- **Contact Messages** - Forwarded to admin
- **Order Numbers** - Included in all emails

### 5. Image Management

- **Upload System** - Drag & drop or click to upload
- **Preview** - See images before saving
- **Validation** - File type and size checks
- **Storage** - Organized in `attached_assets/uploads/`

---

## 🔐 Security

### Current Implementation

- ✅ Input validation with Zod
- ✅ SQL injection prevention (Drizzle ORM)
- ✅ XSS protection (React)
- ✅ File upload validation
- ✅ CORS configuration

### Production Recommendations

⚠️ **Important:** Before deploying to production:

1. **Change Admin Credentials**
   ```typescript
   // Update in server/seed.ts
   username: "your_secure_username"
   password: "your_secure_password_hash" // Use bcrypt!
   ```

2. **Use Environment Variables**
   - Store sensitive data in `.env`
   - Never commit `.env` to Git

3. **Enable HTTPS**
   - Use SSL/TLS certificates
   - Redirect HTTP to HTTPS

4. **Implement Rate Limiting**
   - Prevent brute force attacks
   - Limit API requests

5. **Hash Passwords**
   - Use bcrypt or similar
   - Never store plain text passwords

---

## 🐛 Known Issues & Solutions

### Issue: Images not displaying
**Solution:** Ensure `attached_assets` folder exists and contains images

### Issue: Email not sending
**Solution:** Check Formspree form ID and internet connection

### Issue: Database locked
**Solution:** Close other connections to `sqlite.db`

### Issue: Port already in use
**Solution:** Change port in `vite.config.ts` or kill process on port 5000

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use ESLint and Prettier
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**admine112**

- GitHub: [@admine112](https://github.com/admine112)
- Repository: [Slice-of-Heaven](https://github.com/admine112/Slice-of-Heaven)

---

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Lucide](https://lucide.dev/) - Icon library
- [Formspree](https://formspree.io/) - Email service
- [Drizzle ORM](https://orm.drizzle.team/) - Database toolkit
- [TanStack Query](https://tanstack.com/query) - Data fetching

---

## 📞 Support

If you have any questions or need help:

1. Check the [documentation](#-documentation)
2. Open an [issue](https://github.com/admine112/Slice-of-Heaven/issues)
3. Contact via the website's contact form

---

## 🎉 Features Roadmap

### Planned Features

- [ ] User authentication & accounts
- [ ] Order history for customers
- [ ] Payment integration (Stripe/PayPal)
- [ ] Real-time order tracking
- [ ] Push notifications
- [ ] Loyalty program
- [ ] Promo codes & discounts
- [ ] Multiple delivery addresses
- [ ] Order scheduling
- [ ] Reviews & ratings

### Future Enhancements

- [ ] Mobile app (React Native)
- [ ] Dark mode
- [ ] More languages
- [ ] Advanced analytics
- [ ] Restaurant management
- [ ] Delivery driver app
- [ ] Kitchen display system

---

<div align="center">

**Made with ❤️ and 🍕**

⭐ Star this repo if you like it!

[Report Bug](https://github.com/admine112/Slice-of-Heaven/issues) • [Request Feature](https://github.com/admine112/Slice-of-Heaven/issues)

</div>
