-- =====================================================
-- Tapis.dz — Algerian Carpet Ecommerce Database Schema
-- Migration: 001_schema
-- =====================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- UPDATED_AT TRIGGER FUNCTION
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- =====================================================
-- CATEGORIES
-- =====================================================

CREATE TABLE categories (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_ar     TEXT NOT NULL,
  name_fr     TEXT NOT NULL,
  slug        TEXT NOT NULL UNIQUE,
  description_ar TEXT,
  description_fr TEXT,
  image       TEXT,
  parent_id   UUID REFERENCES categories(id) ON DELETE SET NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_parent_id ON categories(parent_id);

-- =====================================================
-- PRODUCTS
-- =====================================================

CREATE TABLE products (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_ar       TEXT NOT NULL,
  name_fr       TEXT NOT NULL,
  slug          TEXT NOT NULL UNIQUE,
  description_ar TEXT,
  description_fr TEXT,
  price         DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
  sale_price    DECIMAL(10, 2) CHECK (sale_price IS NULL OR sale_price >= 0),
  stock         INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
  featured      BOOLEAN NOT NULL DEFAULT FALSE,
  images        JSONB NOT NULL DEFAULT '[]'::jsonb,
  colors        JSONB NOT NULL DEFAULT '[]'::jsonb,
  dimensions    JSONB NOT NULL DEFAULT '[]'::jsonb,
  category_id   UUID REFERENCES categories(id) ON DELETE SET NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_featured ON products(featured) WHERE featured = TRUE;
CREATE INDEX idx_products_created_at ON products(created_at DESC);
CREATE INDEX idx_products_price ON products(price);

CREATE TRIGGER trigger_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ORDERS
-- =====================================================

CREATE TABLE orders (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name    TEXT NOT NULL,
  customer_phone   TEXT NOT NULL,
  customer_email   TEXT,
  customer_wilaya  TEXT NOT NULL,
  customer_commune TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  items            JSONB NOT NULL DEFAULT '[]'::jsonb,
  total            DECIMAL(10, 2) NOT NULL CHECK (total >= 0),
  status           TEXT NOT NULL DEFAULT 'pending'
                     CHECK (status IN ('pending','confirmed','shipped','delivered','cancelled','refunded')),
  notes            TEXT,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX idx_orders_customer_phone ON orders(customer_phone);

-- =====================================================
-- ADMIN USERS
-- =====================================================

CREATE TABLE admin_users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         TEXT NOT NULL UNIQUE,
  name          TEXT NOT NULL,
  role          TEXT NOT NULL DEFAULT 'admin'
                  CHECK (role IN ('admin', 'superadmin', 'manager')),
  password_hash TEXT NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_admin_users_email ON admin_users(email);

-- =====================================================
-- PRODUCT IMAGES (normalized variant)
-- =====================================================

CREATE TABLE product_images (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  url        TEXT NOT NULL,
  alt_ar     TEXT,
  alt_fr     TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_product_images_product_id ON product_images(product_id);
CREATE INDEX idx_product_images_sort_order ON product_images(product_id, sort_order);

-- =====================================================
-- ROW LEVEL SECURITY
-- =====================================================

-- Categories
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read on categories"
  ON categories
  FOR SELECT
  TO public
  USING (TRUE);

CREATE POLICY "Allow admin write on categories"
  ON categories
  FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- Products
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read on products"
  ON products
  FOR SELECT
  TO public
  USING (TRUE);

CREATE POLICY "Allow admin write on products"
  ON products
  FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- Orders
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow admin all on orders"
  ON orders
  FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- Admin Users
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow admin read on admin_users"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- Product Images
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read on product_images"
  ON product_images
  FOR SELECT
  TO public
  USING (TRUE);

CREATE POLICY "Allow admin write on product_images"
  ON product_images
  FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- =====================================================
-- DEFAULT ADMIN USER (password: admin123)
-- Hashed using SHA-256 via pgcrypto digest()
-- =====================================================

INSERT INTO admin_users (id, email, name, role, password_hash)
VALUES (
  gen_random_uuid(),
  'admin@tapis.dz',
  'مدير المنصة',
  'superadmin',
  '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9'
);
