import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ProductConfigState } from '@/types/showroom';

export interface CartItem {
  id: string; // unique item instance id
  productId: string;
  config: ProductConfigState;
  unitPrice: number;
  quantity: number;
  addedAt: number;
}

interface CartState {
  items: CartItem[];
  wishlist: string[]; // product IDs
  isCartDrawerOpen: boolean;
  isWishlistDrawerOpen: boolean;

  // Actions
  addItem: (productId: string, config: ProductConfigState, unitPrice: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  setCartDrawerOpen: (open: boolean) => void;
  setWishlistDrawerOpen: (open: boolean) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      wishlist: ['virtuo-sofa-01', 'virtuo-chair-01'],
      isCartDrawerOpen: false,
      isWishlistDrawerOpen: false,

      addItem: (productId, config, unitPrice) => {
        const existing = get().items.find(
          (item) =>
            item.productId === productId &&
            item.config.upholsteryId === config.upholsteryId &&
            item.config.finishId === config.finishId &&
            item.config.accentId === config.accentId
        );

        if (existing) {
          set((state) => ({
            items: state.items.map((i) =>
              i.id === existing.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
            isCartDrawerOpen: true,
          }));
        } else {
          const newItem: CartItem = {
            id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
            productId,
            config,
            unitPrice,
            quantity: 1,
            addedAt: Date.now(),
          };
          set((state) => ({
            items: [newItem, ...state.items],
            isCartDrawerOpen: true,
          }));
        }
      },

      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== itemId),
        }));
      },

      updateQuantity: (itemId, delta) => {
        set((state) => ({
          items: state.items
            .map((item) => {
              if (item.id === itemId) {
                const nextQty = item.quantity + delta;
                return nextQty > 0 ? { ...item, quantity: nextQty } : null;
              }
              return item;
            })
            .filter(Boolean) as CartItem[],
        }));
      },

      clearCart: () => set({ items: [] }),

      toggleWishlist: (productId) => {
        set((state) => {
          const exists = state.wishlist.includes(productId);
          return {
            wishlist: exists
              ? state.wishlist.filter((id) => id !== productId)
              : [...state.wishlist, productId],
          };
        });
      },

      isInWishlist: (productId) => get().wishlist.includes(productId),

      setCartDrawerOpen: (open) => set({ isCartDrawerOpen: open }),
      setWishlistDrawerOpen: (open) => set({ isWishlistDrawerOpen: open }),
    }),
    {
      name: 'virtuo-cart-storage',
      partialize: (state) => ({ items: state.items, wishlist: state.wishlist }),
    }
  )
);

