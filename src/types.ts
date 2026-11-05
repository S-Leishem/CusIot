export type Category = { id: string; name: string; slug: string; description: string | null; image_url: string | null };
export type Product = {
  id: string; name: string; slug: string; description: string | null; price: number;
  stock_quantity: number; image_url: string | null; category_id: string | null;
  is_featured: boolean; is_published: boolean; created_at: string; category?: Category | null;
};
export type StoreSettings = {
  store_name: string; whatsapp_number: string; primary_email: string; secondary_email: string;
  delivery_charge: number; free_delivery_threshold: number | null; currency: string; announcement: string | null;
};
export type CartItem = Pick<Product, "id" | "name" | "price" | "image_url" | "stock_quantity"> & { quantity: number };
export type Checkout = { name: string; address: string; city: string; state: string; pin: string; instructions: string };
