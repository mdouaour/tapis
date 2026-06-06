# 🚀 Deployment Checklist - تاپيس | Tapis

## Pre-Deployment

### 1. Supabase Setup
- [ ] Create a Supabase project at [supabase.com](https://supabase.com)
- [ ] Run the schema migration in `supabase/migrations/001_schema.sql`
- [ ] Run the seed data in `supabase/migrations/002_seed.sql`
- [ ] Run the admin RPC migration in `supabase/migrations/003_admin_rpc.sql`
- [ ] Enable `pgcrypto` extension (already in migration)
- [ ] Get your Supabase project URL, anon key, and service role key

### 2. Environment Variables
- [ ] Copy `.env.example` to `.env.local`
- [ ] Fill in all required variables:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `NEXT_PUBLIC_SITE_URL`
  - `NEXT_PUBLIC_WHATSAPP_NUMBER`

### 3. Local Testing
- [ ] Run `npm install`
- [ ] Run `npm run dev` and verify all pages load
- [ ] Test the admin login at `/ar/admin/login` (default: admin@tapis.dz / admin123)
- [ ] Test the checkout flow
- [ ] Test WhatsApp button
- [ ] Test Arabic/French language switching
- [ ] Test RTL layout

## Vercel Deployment

### 4. Git Setup
- [ ] Initialize git: `git init`
- [ ] Create a GitHub/GitLab repository
- [ ] Push code to the repository

### 5. Vercel Import
- [ ] Go to [vercel.com](https://vercel.com) and import your repository
- [ ] Select the "Next.js" framework preset
- [ ] Add all environment variables from `.env.local` to Vercel project settings
- [ ] Set `NEXT_PUBLIC_SITE_URL` to your production domain

### 6. Domain Setup (Optional)
- [ ] Add custom domain in Vercel (e.g., tapis.dz)
- [ ] Configure DNS records with your domain provider
- [ ] Wait for SSL certificate provisioning

## Post-Deployment

### 7. Verification
- [ ] Visit the deployed site
- [ ] Test all pages load correctly
- [ ] Test search functionality
- [ ] Test cart and checkout
- [ ] Test admin panel login
- [ ] Test WhatsApp button opens correct number
- [ ] Verify SEO meta tags with browser inspector
- [ ] Test on mobile devices (responsive)

### 8. SEO Setup
- [ ] Submit sitemap to Google Search Console
- [ ] Register Arabic and French versions with hreflang tags
- [ ] Set up analytics (Google Analytics or similar)

### 9. Production Prep
- [ ] Change default admin password immediately
- [ ] Set up Supabase Row Level Security (already configured)
- [ ] Configure backup for Supabase database
- [ ] Set up monitoring (Vercel Analytics)
- [ ] Add privacy policy and terms of service pages

### 10. Launch
- [ ] Final walkthrough of all features
- [ ] Test payment (Cash on Delivery)
- [ ] Announce on social media
- [ ] Monitor for errors in first 24 hours

## Performance Targets
- [ ] Lighthouse score > 90 on mobile
- [ ] First Contentful Paint < 1.5s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] First Input Delay < 100ms

## Security Checklist
- [ ] All API routes require authentication where needed
- [ ] SQL injection protection (via Supabase parameterized queries)
- [ ] XSS prevention (React handles this by default)
- [ ] HTTPS enforced (Vercel handles this)
- [ ] Security headers configured
- [ ] Admin session timeout implemented
- [ ] Dependencies updated (`npm audit`)
