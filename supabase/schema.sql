-- AntiGravity Supabase Schema & RLS Policies

-- Create enum for Profile roles
CREATE TYPE user_role AS ENUM ('buyer', 'seller', 'both');

-- Create enum for Order status
CREATE TYPE order_status AS ENUM ('pending', 'completed', 'refunded', 'failed');

-- Table: profiles
CREATE TABLE profiles (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  role user_role DEFAULT 'buyer',
  stripe_account_id TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Table: books
CREATE TABLE books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id UUID REFERENCES profiles(id) NOT NULL,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  cover_image_url TEXT,
  pdf_url TEXT,
  price DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  category TEXT,
  tags TEXT[],
  language TEXT DEFAULT 'English',
  pages INTEGER,
  preview_pages INTEGER,
  total_sales INTEGER DEFAULT 0,
  rating_avg DECIMAL(3,2),
  rating_count INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT FALSE,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Table: categories
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon TEXT,
  description TEXT,
  book_count INTEGER DEFAULT 0
);

-- Table: orders
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_id UUID REFERENCES profiles(id) NOT NULL,
  stripe_payment_intent_id TEXT UNIQUE,
  stripe_session_id TEXT,
  status order_status DEFAULT 'pending',
  total_amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Table: order_items
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) NOT NULL,
  book_id UUID REFERENCES books(id) NOT NULL,
  seller_id UUID REFERENCES profiles(id) NOT NULL,
  price_at_purchase DECIMAL(10,2) NOT NULL,
  platform_fee DECIMAL(10,2) NOT NULL,
  seller_payout DECIMAL(10,2) NOT NULL
);

-- Table: reviews
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  book_id UUID REFERENCES books(id) NOT NULL,
  reviewer_id UUID REFERENCES profiles(id) NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Table: wishlists
CREATE TABLE wishlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) NOT NULL,
  book_id UUID REFERENCES books(id) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, book_id)
);

-- Function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name, role)
  VALUES (
    new.id, 
    new.raw_user_meta_data->>'username', 
    new.raw_user_meta_data->>'full_name', 
    COALESCE((new.raw_user_meta_data->>'role')::user_role, 'buyer'::user_role)
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call handle_new_user on auth.users insert
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-------------------------------------------------------
-- ENABLE ROW LEVEL SECURITY (RLS)
-------------------------------------------------------
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;

-------------------------------------------------------
-- RLS POLICIES
-------------------------------------------------------

-- Profiles: Users can read all published sellers/profiles, but only update their own
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Books: Anyone can read published books, only verified sellers can insert, only owner can update/delete
CREATE POLICY "Published books are viewable by everyone" ON books FOR SELECT USING (is_published = true);
CREATE POLICY "Sellers can view all their own books" ON books FOR SELECT USING (auth.uid() = seller_id);
CREATE POLICY "Verified sellers can insert books" ON books FOR INSERT WITH CHECK (auth.uid() = seller_id AND EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_verified = true));
CREATE POLICY "Sellers can update their own books" ON books FOR UPDATE USING (auth.uid() = seller_id);
CREATE POLICY "Sellers can delete their own books" ON books FOR DELETE USING (auth.uid() = seller_id);

-- Categories: Anyone can read, only service role (admin) can modify
CREATE POLICY "Categories are viewable by everyone" ON categories FOR SELECT USING (true);

-- Orders: Users can only read their own orders
CREATE POLICY "Users view own orders" ON orders FOR SELECT USING (auth.uid() = buyer_id);

-- Order Items: Users view their own order items, sellers view their sold items
CREATE POLICY "Users view own order items" ON order_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.buyer_id = auth.uid()) OR auth.uid() = seller_id
);

-- Reviews: Anyone can read, only buyers of the book can insert (simplified here to anyone can read, owner can insert)
CREATE POLICY "Reviews viewable by everyone" ON reviews FOR SELECT USING (true);
CREATE POLICY "Users can create reviews" ON reviews FOR INSERT WITH CHECK (auth.uid() = reviewer_id);
CREATE POLICY "Users can update own reviews" ON reviews FOR UPDATE USING (auth.uid() = reviewer_id);
CREATE POLICY "Users can delete own reviews" ON reviews FOR DELETE USING (auth.uid() = reviewer_id);

-- Wishlists: Users manage their own wishlists
CREATE POLICY "Users view own wishlist" ON wishlists FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own wishlist" ON wishlists FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete own wishlist" ON wishlists FOR DELETE USING (auth.uid() = user_id);
