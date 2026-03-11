import { Book } from "@/types";
import { BookCard } from "./BookCard";

interface BookGridProps {
  books: Book[];
}

export function BookGrid({ books }: BookGridProps) {
  if (!books?.length) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-32 text-center bg-background/40 border-none rounded-2xl backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.05)]">
        <div className="w-16 h-16 rounded-full bg-background/50 flex items-center justify-center mb-4 shadow-[inset_0_2px_10px_rgba(0,0,0,0.1)] border-none">
          <span className="text-primary font-black text-2xl font-heading">0</span>
        </div>
        <p className="text-xl text-muted-foreground font-heading tracking-widest uppercase">No books found</p>
        <p className="text-sm text-muted-foreground mt-2">Adjust your filters to locate more results.</p>
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
