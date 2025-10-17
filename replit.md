# Slice of Heaven Pizza Website

## Overview

Slice of Heaven is a premium pizza restaurant website built with a modern full-stack architecture. The application features a bilingual (English/Ukrainian) interface, online ordering system with a pizza customization calculator, admin panel for content management, and a design inspired by premium food delivery platforms with a neon-lit urban aesthetic.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server for fast HMR and optimized production builds
- **Wouter** for lightweight client-side routing instead of React Router
- **TanStack Query (React Query)** for server state management, data fetching, and caching

**UI & Styling**
- **Shadcn/ui** component library built on Radix UI primitives for accessible, customizable components
- **Tailwind CSS** for utility-first styling with custom design tokens
- **Class Variance Authority (CVA)** for component variant management
- Custom CSS variables for theming (light/dark mode support)
- Design system following "premium street food aesthetic" with neon orange accents (HSL: 25 95% 55%) and dark backgrounds

**Form Management**
- **React Hook Form** for performant form state management
- **Zod** for runtime schema validation
- **@hookform/resolvers** for integrating Zod schemas with React Hook Form

**Internationalization**
- Custom i18n context provider supporting English and Ukrainian languages
- Translation keys stored in centralized dictionary
- Language persistence and switching functionality

### Backend Architecture

**Server Framework**
- **Express.js** running on Node.js for REST API
- TypeScript for type safety across backend code
- Custom middleware for request logging and error handling

**Database & ORM**
- **Neon Serverless PostgreSQL** as the database provider
- **Drizzle ORM** for type-safe database queries and schema management
- Connection pooling via `@neondatabase/serverless`
- WebSocket support for serverless database connections

**API Design**
- RESTful endpoints organized by resource:
  - `/api/pizzas` - Pizza CRUD operations
  - `/api/ingredients` - Ingredient management
  - `/api/orders` - Order creation and management
  - `/api/contacts` - Contact form submissions
  - `/api/admin/login` - Admin authentication
- Request/response validation using Drizzle-Zod schemas
- JSON-based communication

**Data Storage Strategy**
- Storage abstraction layer (`IStorage` interface) for database operations
- Separation of concerns between routes and data access logic
- Database seeding script for initial data population

### Database Schema

**Core Tables**
- **admins** - Admin user credentials (UUID primary key, username, password)
- **pizzas** - Pizza products with bilingual fields (nameEn, nameUa, descriptionEn, descriptionUa), category, pricing, image URL, availability status
- **ingredients** - Available toppings/ingredients with bilingual names and pricing
- **orders** - Customer orders with customer details, pizza selection, size, extra ingredients array, total price, and status tracking
- **contacts** - Contact form submissions with name, email, and message

**Key Design Decisions**
- Bilingual content stored in separate columns (En/Ua) rather than using a separate translations table for simpler queries
- Pizza categories as text enum: 'classic', 'spicy', 'vegetarian', 'dessert'
- Order status tracking: 'pending', 'confirmed', 'delivered', 'cancelled'
- Decimal type for monetary values (precision: 10, scale: 2)
- Array type for storing extra ingredient IDs in orders

### Authentication & Authorization

- Simple credential-based admin authentication (username/password comparison)
- No session management or JWT tokens implemented (suitable for basic admin access)
- **Security Note**: Passwords stored in plaintext (should use bcrypt/hashing in production)

### Development Environment

**Replit Integration**
- Custom Vite plugins for Replit-specific features (runtime error overlay, cartographer, dev banner)
- Development server proxying through Express for unified local development
- Static file serving in production mode

**Build & Deployment**
- Development: `tsx` for running TypeScript server with hot reload
- Production build: Vite for client bundling, esbuild for server bundling
- Output: Client assets to `dist/public`, server bundle to `dist/index.js`

**Path Aliases**
- `@/*` → `client/src/*` for client-side imports
- `@shared/*` → `shared/*` for shared types/schemas
- `@assets/*` → `attached_assets/*` for static assets

## External Dependencies

### Third-Party UI Libraries
- **Radix UI** - Comprehensive set of accessible, unstyled component primitives (@radix-ui/react-*)
- **Lucide React** - Icon library for consistent iconography
- **Embla Carousel** - Carousel/slider functionality
- **CMDK** - Command palette component
- **Vaul** - Drawer component primitives

### Database & ORM
- **Neon Serverless** - Serverless PostgreSQL database provider
- **Drizzle ORM** - TypeScript ORM with zero-cost abstractions
- **Drizzle Kit** - CLI for schema migrations and database management
- **ws** - WebSocket library for Neon database connections

### Utilities & Tools
- **date-fns** - Date formatting and manipulation
- **nanoid** - Unique ID generation
- **clsx** & **tailwind-merge** - Conditional className utilities

### Build & Development Tools
- **Vite** - Frontend build tool and dev server
- **esbuild** - Fast JavaScript bundler for server code
- **tsx** - TypeScript execution for development
- **PostCSS** & **Autoprefixer** - CSS processing

### Type Safety
- **Zod** - Runtime schema validation
- **drizzle-zod** - Generate Zod schemas from Drizzle tables
- **TypeScript 5+** - Static type checking across the stack

### Font Resources
- **Google Fonts** - Custom typography (Bebas Neue, Inter, Poppins, Playfair Display)

### Asset Management
- Static assets stored in `attached_assets/generated_images/` directory
- Pizza photos, logos, and promotional images served directly from filesystem