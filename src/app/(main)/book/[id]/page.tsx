import { BookDetail } from "@/components/books/BookDetail";
import { Book } from "@/types";
import { notFound } from "next/navigation";

// Mock fetching logic for demonstration
async function getBookById(id: string): Promise<Book | null> {
  if (id === "1" || id === "neuromancer-chronicles" || id === "neuromancer") {
    return {
      id: "1",
      seller_id: "s1",
      title: "Neuromancer Chronicles",
      slug: "neuromancer",
      description: "A deep dive into the cyberpunk reality of the next century.\n\nThis manuscript details the vast sprawling networks of the matrix and the rogue AIs attempting to dominate cyberspace. Prepare your neural interfaces for high-bandwidth downloads.\n\nRequired reading for all Level 4+ netrunners.",
      price: 14.99,
      currency: "USD",
      category: "Sci-Fi",
      rating_avg: 4.8,
      rating_count: 124,
      pages: 342,
      preview_pages: 15,
      language: "EN-US",
      is_published: true,
      is_featured: true,
      total_sales: 1540,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  }
  
  return {
    id: id,
    seller_id: "unknown_seller",
    title: "Unknown Protocol",
    slug: id,
    description: "Decryption failed. No details available for this frequency.",
    price: 99.99,
    currency: "USD",
    category: "Unknown",
    rating_avg: 0,
    rating_count: 0,
    pages: 0,
    preview_pages: 0,
    is_published: true,
    is_featured: false,
    total_sales: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const book = await getBookById(resolvedParams.id);
  
  if (!book) {
    return { title: 'Protocol Not Found | AntiGravity' };
  }
  
  return {
    title: `${book.title} | AntiGravity`,
    description: book.description,
  };
}

export default async function BookPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const book = await getBookById(resolvedParams.id);

  if (!book) {
    notFound();
  }

  return <BookDetail book={book} />;
}
