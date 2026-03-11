import { Book } from "@/types";
import { BookCard } from "./BookCard";

interface BookGridProps {
  books: Book[];
}

export function BookGrid({ books }: BookGridProps) {
  if (!books?.length) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-32 text-center bg-bg-surface/30 border border-white/5 rounded-2xl backdrop-blur-sm">
        <div className="w-16 h-16 rounded-full bg-bg-void flex items-center justify-center mb-4 shadow-[inset_0_0_15px_rgba(0,0,0,0.8)] border border-white/5">
          <span className="text-neon-purple font-black text-2xl font-orbitron">0</span>
        </div>
        <p className="text-xl text-text-muted font-orbitron tracking-widest uppercase">No protocols found</p>
        <p className="text-sm text-text-muted mt-2">Adjust your sub-space frequencies to locate more results.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
