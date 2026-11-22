# VibeSpark Blog CMS — Architecture & Setup Guide

This document explains the fully functional Blog CMS implemented in the VibeSpark platform, connecting directly to your local MySQL database (`vibespark_db`) using Prisma ORM.

---

## 1. Stack & Architecture

- **Database**: Local MySQL 8.0 running on `localhost:3306`
- **Database Name**: `vibespark_db`
- **ORM**: Prisma ORM v6 (`@prisma/client` & `prisma`)
- **Backend API**: Node.js / Express on `http://127.0.0.1:5000` (proxied seamlessly through Vite dev server via `/api/*`)
- **Rich Text Editor**: TipTap (`@tiptap/react`, `@tiptap/pm`, `@tiptap/starter-kit`)
- **CMS Frontend**: Strictly Black & White aesthetic (`/admin`), high-contrast modern brutalist/minimalist design
- **Public Integration**: `/blog` and `/blog/:slug` connected directly to MySQL (displaying only published blogs)
- **Dynamic Sitemap**: `/api/sitemap.xml` automatically syncs all published articles

---

## 2. Environment Configuration (`.env`)

```env
# Server & Port
PORT=5000

# Local MySQL Database Connection String
DATABASE_URL="mysql://root:root@localhost:3306/vibespark_db"

# JWT Authentication Secret
JWT_SECRET="vibespark_super_secure_jwt_secret_key_2026"

# Initial Admin Credentials (used during database seeding)
ADMIN_EMAIL="admin@vibespark.in"
ADMIN_PASSWORD="admin_secure_password"
ADMIN_NAME="VibeSpark Admin"
```

A template is also provided at `.env.example`.

---

## 3. Database Schema (`prisma/schema.prisma`)

- **`admins` table**:
  - `id`: UUID (Primary Key)
  - `email`: Unique Admin Email
  - `passwordHash`: Bcrypt-hashed password (cost factor 10)
  - `name`: Admin display name
  - `createdAt`, `updatedAt`

- **`posts` table**:
  - `id`: UUID (Primary Key)
  - `slug`: Unique SEO URL slug
  - `title`: Article headline
  - `subtitle`: Summary deck
  - `summary`: Executive briefing
  - `content`: TipTap HTML rich-text body (`@db.LongText`)
  - `category`: Category taxonomy
  - `badge`: Display tag
  - `date`, `readTime`: Metadata
  - `image`, `imageAlt`: Featured image with descriptive alt text
  - `published`: Boolean (Controls draft vs live public visibility)
  - `views`: Readership counter
  - `authorName`, `authorRole`, `authorAvatar`: Author attribution
  - `seoTitle`, `metaDescription`, `focusKeyword`, `canonicalUrl`: Complete SEO schema
  - `takeawaysJson`, `sectionsJson`: Structured deep-dive arrays

---

## 4. Admin Credentials & Access

- **CMS Dashboard URL**: [http://localhost:5173/admin](http://localhost:5173/admin)
- **Admin Email**: `admin@vibespark.in`
- **Admin Password**: `admin_secure_password`
- **Security Policy**: No public user registration. Only the single verified administrator account created from environment variables has access.

---

## 5. Available Commands

- `npm run dev`: Runs Vite frontend on `http://127.0.0.1:5173`
- `npm run server`: Starts the MySQL API server on `http://127.0.0.1:5000`
- `npm run seed`: Seeds the database with the solitary admin and all 6 verified existing articles
- `npm run build`: Generates production client bundle
