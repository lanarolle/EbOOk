import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Book } from '@/types'

export interface CartItemType {
  book: Book;
  quantity: number;
}

interface CartState {
  items: CartItemType[];
  isOpen: boolean;
  addItem: (book: Book) => void;
  removeItem: (bookId: string) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setIsOpen: (isOpen: boolean) => void;
  getCartTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (book) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.book.id === book.id);

        if (existingItem) {
          // eBooks are single quantity items. If already in cart, just open the cart.
          set({ isOpen: true });
          return;
        }

        set({ items: [...currentItems, { book, quantity: 1 }], isOpen: true });
      },
      removeItem: (bookId) => {
        set({ items: get().items.filter((item) => item.book.id !== bookId) });
      },
      clearCart: () => set({ items: [] }),
      toggleCart: () => set({ isOpen: !get().isOpen }),
      setIsOpen: (isOpen) => set({ isOpen }),
      getCartTotal: () => {
        return get().items.reduce((total, item) => total + Number(item.book.price), 0);
      },
    }),
    {
      name: 'antigravity-cart-storage',
    }
  )
)
