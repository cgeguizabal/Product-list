import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set) => ({
      //CART ARRAY OBJECT
      cart: [],
      //TOTAL BILL
      total: 0,
      encreaseTotal: () =>
        set((state) => ({
          total: state.cart.reduce(
            (accumulator, current) =>
              accumulator + current.price * current.quantity,
            0
          ),
        })),

      //TOTAL QUANTITY
      quantity: 0,
      encreaseQuantity: () =>
        set((state) => ({
          quantity: state.cart.reduce(
            (accumulator, current) => accumulator + current.quantity,
            0
          ),
        })),

      //product handlers
      handleAddProduct: (product) => {
        set((state) => {
          if (state.cart.some((item) => item.id === product.id)) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          } else {
            return { cart: [...state.cart, { ...product, quantity: 1 }] };
          }
        });
      },
      handleDeleteItem: (product) => {
        set((state) => {
          if (state.cart.some((item) => item.id === product.id)) {
            if (product.quantity > 1) {
              return {
                cart: state.cart.map((item) =>
                  item.id === product.id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
                ),
              };
            } else {
              return {
                cart: state.cart.filter((item) => item.id !== product.id),
              };
            }
          }
        });
      },

      clearCart: () => set((state) => ({ cart: [] })),
    }),
    {
      name: "cart-storage",
    }
  )
);
