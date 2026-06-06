# تاپيس | Tapis — Algerian Carpet Store

> Premium ecommerce platform for traditional and modern Algerian carpets. Built with Next.js 16, Supabase, and Tailwind CSS.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-2-3ecf8e?style=flat-square&logo=supabase)
![Arabic-First](https://img.shields.io/badge/Arabic-First-8b5cf6?style=flat-square)

---

## ✨ Features

### Customer Side
- **Home Page** — Hero section, featured products, category showcase, and benefits
- **Category Pages** — Browse products by category with responsive grids
- **Product Pages** — Image gallery, color/dimension selectors, pricing, stock info
- **Search** — Full-text product search across Arabic and French names
- **Cart** — Persistent cart with quantity controls, color/dimension tracking
- **Checkout** — COD (Cash on Delivery) with Algerian wilaya/commune selection
- **WhatsApp Integration** — Floating button for instant customer inquiries
- **RTL Support** — Full Arabic right-to-left layout
- **Mobile-First** — Responsive design optimized for all devices

### Admin Panel
- Secure login with session management
- Dashboard with stats, revenue chart, and recent orders
- Product CRUD (create, read, update, delete)
- Category management
- Order management with status tracking

### Technical
- **Next.js 16** App Router with Server Components
- **i18n** — Arabic (primary) and French (secondary) via `next-intl`
- **Supabase** — PostgreSQL database, authentication, Row Level Security
- **shadcn/ui** — Accessible, customizable UI components
- **Zod** — Type-safe form validation
- **SEO** — Meta tags, Open Graph, hreflang, JSON-LD ready
- **Performance** — Optimized images, server components, skeleton loading

---

## 🏗️ Architecture

```
src/
├── app/
│   ├── [locale]/          # i18n routes (ar, fr)
│   │   ├── page.tsx       # Home page
│   │   ├── layout.tsx     # Root layout (header, footer, providers)
│   │   ├── cart/          # Shopping cart
│   │   ├── checkout/      # COD checkout
│   │   ├── categories/    # Category listing & detail
│   │   ├── products/      # Product detail
│   │   ├── search/        # Search results
│   │   └── admin/         # Admin panel (dashboard, products, orders, categories)
│   └── api/               # API routes
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── shared/            # Header, Footer, ProductCard, CartSheet, etc.
│   ├── features/          # ProductActions, etc.
│   └── admin/             # AdminLayout
├── lib/
│   ├── supabase/          # Client, server, admin, queries
│   ├── constants.ts       # Site config, WhatsApp, wilayas
│   ├── utils.ts           # formatPrice, slugify, etc.
│   └── validations.ts     # Zod schemas
├── hooks/                 # useCart
├── providers/             # CartProvider
├── i18n/
│   ├── messages/          # ar.json, fr.json
│   ├── routing.ts         # next-intl routing config
│   └── request.ts         # next-intl request config
└── types/                 # TypeScript interfaces
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm 9+
- Supabase account (free tier works)

### 1. Setup Environment

```bash
cp .env.example .env.local
```

Fill in your Supabase credentials and WhatsApp number.

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Database Migrations

Execute the SQL files in `supabase/migrations/` against your Supabase project:
1. `001_schema.sql` — Database tables, indexes, RLS
2. `002_seed.sql` — 20 sample carpet products
3. `003_admin_rpc.sql` — Admin password verification function

### 4. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) — you'll be redirected to `/ar`.

### 5. Access Admin Panel

Navigate to `/ar/admin/login`
- **Email:** `admin@tapis.dz`
- **Password:** `admin123`

---

## 🐳 Database Schema

| Table | Description |
|-------|-------------|
| `categories` | Product categories (e.g., Salon, Bedroom, Kids) |
| `products` | Products with multilingual names, prices, images, colors, dimensions |
| `orders` | Customer orders with shipping info and items |
| `admin_users` | Admin accounts with hashed passwords |
| `product_images` | Normalized product images (optional, images also stored in products JSON) |

---

## 🌐 Internationalization

- **Default:** Arabic (العربية)
- **Secondary:** French (Français)
- **Approach:** `next-intl` with locale-based routing
- **RTL:** Full right-to-left support for Arabic
- **Translation files:** `src/i18n/messages/{ar,fr}.json`

---

## 📦 Deployment

### One-Click Vercel Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Import your Git repository
2. Add environment variables (from `.env.example`)
3. Deploy — zero configuration needed

See [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) for full details.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| [Next.js 16](https://nextjs.org/) | React framework with App Router |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first styling |
| [shadcn/ui](https://ui.shadcn.com/) | Accessible components |
| [Supabase](https://supabase.com/) | Backend, database, auth |
| [next-intl](https://next-intl.dev/) | Internationalization |
| [Zod](https://zod.dev/) | Schema validation |
| [React Hook Form](https://react-hook-form.com/) | Form management |
| [Lucide React](https://lucide.dev/) | Icons |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is private and proprietary.

---

*Built with ❤️ for the Algerian market*
