import { useCartStore } from "../store/cartStore";

export function CartItem({ item }) {
  const { name, price, quantity } = item;
  let subTotal = price * quantity;

  const handleDeleteItem = useCartStore((state) => state.handleDeleteItem);

  return (
    <section className="cartItem__wrapper">
      <div className="cartItem__container">
        <div>
          <p className="cartItem__name">{name}</p>
          <div className="cartItem__infoContainer">
            <p className="cartItem__infoContainer-quantity">{quantity}x</p>
            <p className="cartItem__infoContainer-price">
              @ {price.toFixed(2)}{" "}
              <span className="cartItem__infoContainer-subTotal">
                {" "}
                <span className="cartItem__infoContainer-subTotal">$</span>
                {subTotal.toFixed(2)}
              </span>
            </p>
          </div>
        </div>
        <button
          className="cartItem__delete-button"
          onClick={() => handleDeleteItem(item)}
        >
          <div className="cartItem__delete"></div>
        </button>
      </div>
      <hr className="cartItem__line" />
    </section>
  );
}
