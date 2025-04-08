import { ModalItem } from "./ModalItem";
import { useCartStore } from "../store/cartStore";

export function Modal({ handleModal }) {
  const cart = useCartStore((state) => state.cart);
  const total = useCartStore((state) => state.total);

  const clear = useCartStore((state) => state.clearCart);

  const finishJob = () => {
    handleModal();
    clear();
  };

  return (
    <>
      <div className="modal__wrapper">
        <div className="modal__container">
          <div>
            <img src="icon-order-confirmed.svg" alt="" />
            <div>
              <h1 className="modal__title">Order Confirmed</h1>
              <p className="modal__text">We hope enjoy your food!</p>
            </div>
            <div className="modal__item-container">
              {cart.map((item, index) => {
                return <ModalItem item={item} key={index + 1} />;
              })}
              <div className="modal__total">
                <p className="modal__total-order">Order Total</p>
                <h2 className="modal__total-price">${total.toFixed(2)}</h2>
              </div>
            </div>
            <div className="modal__button-container">
              <button className="modal__button" onClick={finishJob}>
                Start New Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
