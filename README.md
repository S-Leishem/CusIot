# CusIot

CusIot is a responsive React + TypeScript catalogue for a small electronics business in Imphal. Products, categories, stock and delivery settings are read from Supabase; checkout creates a prefilled WhatsApp message and never claims payment or order confirmation.

## Local development

1. Install Node.js 20+.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local` and add the Supabase project URL and public anon key.
4. Run `npm run dev`.

## Supabase setup

Create a Supabase project, open SQL Editor, and run [`supabase/schema.sql`](./supabase/schema.sql). The schema enables RLS and only exposes published products, active categories, store settings, and public product images to anonymous visitors. Never put a service-role key in the frontend.

Add products and categories in the Supabase dashboard. Product `slug` values must be unique. Upload images to the `product-images` public bucket and store their public URL in `products.image_url`. Change `stock_quantity` after personally confirming an order. Set `delivery_charge`, optional `free_delivery_threshold`, and the WhatsApp number in `store_settings`.

## Deployment

### Cloudflare Pages

1. Push this repository to GitHub.
2. In Cloudflare, open **Workers & Pages → Create application → Pages → Connect to Git**.
3. Select `S-Leishem/CusIot`.
4. Use these build settings:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `/`
5. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` under **Settings → Environment variables** for Preview and Production.
6. Deploy. Every push to the selected branch will trigger a new deployment.

The public `robots.txt` and `sitemap.xml` are included; update the sitemap domain if the final Pages domain changes.
