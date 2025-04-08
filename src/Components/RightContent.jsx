import { useEffect } from "react";
import { useCartStore } from "../store/cartStore";

export function RightContent({ children }) {
  const quantity = useCartStore((state) => state.quantity);

  const setQuantity = useCartStore((state) => state.encreaseQuantity);

  useEffect(() => {
    setQuantity();
  });

  const cart = useCartStore((state) => state.cart);
  return (
    <div className="RightContent__container">
      <div className="box__container">
        <h1 className="box__title">Your Cart({quantity})</h1>
        {cart.length === 0 ? (
          <>
            <figure className="box__emptyIconContainer">
              <img
                className="box__emptyIconContainer--icon"
                src="illustration-empty-cart.svg"
                alt="empty-icon"
              />
            </figure>
            <p className="box__paragraph">Your added items will appear here</p>
          </>
        ) : (
          <>{children}</>
        )}
        ;
      </div>
    </div>
  );
}
