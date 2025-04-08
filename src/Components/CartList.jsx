import { useEffect } from "react";
import { CartItem } from "./CartItem";
import { useCartStore } from "../store/cartStore";

export function CartList({ handleModal }) {
  //TOTAL STATES
  const total = useCartStore((state) => state.total);
  const setTotal = useCartStore((state) => state.encreaseTotal);

  //CART STATES
  const cart = useCartStore((state) => state.cart);

  useEffect(() => {
    setTotal();
  });

  return (
    <>
      <div>
        {cart.map((item, index) => {
          return <CartItem key={index + 1} item={item} />;
        })}
        <div className="cartlist__total">
          <p className="cartlist__total-text">Order Total</p>
          <p className="cartlist__total-number">${total.toFixed(2)}</p>
        </div>
        <div className="cartlist__phrase">
          <img
            className="cartlist__phrase-image"
            src="icon-carbon-neutral.svg"
            alt="tree"
          />
          <p className="cartlist__phrase-text">
            This is a{" "}
            <span className="cartlist__phrase-text--span">carbon-neutral</span>{" "}
            delivery
          </p>
        </div>
        <div className="cartlist__button-container">
          <button className="cartlist__button" onClick={() => handleModal()}>
            Confirm Order
          </button>
        </div>
      </div>
    </>
  );
}
