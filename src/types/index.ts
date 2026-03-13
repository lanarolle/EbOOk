export type Role = 'buyer' | 'seller' | 'both' | 'admin';

export interface Profile {
  id: string;
  username: string;
  full_name?: string;
  avatar_url?: string;
  bio?: string;
  role: Role;
  stripe_account_id?: string;
  is_verified: boolean;
  created_at: string;
}

export interface Book {
  id: string;
  seller_id: string;
  title: string;
  slug: string;
  description?: string;
  cover_image_url?: string;
  pdf_url?: string;
  price: number;
  currency: string;
  category?: string;
  tags?: string[];
  language?: string;
  pages?: number;
  preview_pages?: number;
  total_sales: number;
  rating_avg?: number;
  rating_count?: number;
  is_published: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  description?: string;
  book_count: number;
}

export interface Order {
  id: string;
  buyer_id: string;
  stripe_payment_intent_id?: string;
  stripe_session_id?: string;
  status: 'pending' | 'completed' | 'refunded' | 'failed';
  total_amount: number;
  currency: string;
  created_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  book_id: string;
  seller_id: string;
  price_at_purchase: number;
  platform_fee: number;
  seller_payout: number;
}

export interface Review {
  id: string;
  book_id: string;
  reviewer_id: string;
  rating: number;
  comment?: string;
  created_at: string;
}

export interface Wishlist {
  id: string;
  user_id: string;
  book_id: string;
  created_at: string;
}
