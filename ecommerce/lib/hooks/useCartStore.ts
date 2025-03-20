import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { OrderItems, Cart } from '../models/OrderModel';
import { round2 } from '../utils';

const initialState: Cart = {
  items: [],
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
};

// Zustand store with persistence
export const useCartStore = create<
  Cart & { setCart: (cart: Partial<Cart>) => void }
>()(
  persist(
    (set) => ({
      ...initialState,
      setCart: (cart) =>
        set((state) => ({
          ...state,
          ...cart, // Merge the new properties with existing state
        })),
    }),
    { name: 'cart-store' }
  )
);

export function useCartService() {
  const { items, itemsPrice, shippingPrice, taxPrice, totalPrice, setCart } =
    useCartStore();

  const calcPrice = (items: OrderItems[]) => {
    const itemsPrice = round2(
      items.reduce((a, item) => a + item.price * item.quantity, 0)
    );
    const shippingPrice = round2(itemsPrice > 100 ? 0 : 10);
    const taxPrice = round2(itemsPrice * 0.15);
    const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);
    return { itemsPrice, shippingPrice, taxPrice, totalPrice };
  };

  const increase = (item: OrderItems) => {
    const existingItem = items.find((i) => i.slug === item.slug);
    const updatedCartItems = existingItem
      ? items.map((i) =>
          i.slug === item.slug ? { ...i, quantity: i.quantity + 1 } : i
        )
      : [...items, { ...item, quantity: 1 }];

    setCart({ items: updatedCartItems, ...calcPrice(updatedCartItems) });
  };

  const decrease = (item: OrderItems) => {
    const existingItem = items.find((i) => i.slug === item.slug);
    if (!existingItem) return;

    const updatedCartItems =
      existingItem.quantity === 1
        ? items.filter((i) => i.slug !== item.slug)
        : items.map((i) =>
            i.slug === item.slug ? { ...i, quantity: i.quantity - 1 } : i
          );

    setCart({ items: updatedCartItems, ...calcPrice(updatedCartItems) });
  };

  return {
    items,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    increase,
    decrease,
  };
}
