export function ModalItem({ item }) {
  const { name, price, quantity } = item;
  const subTotal = price * quantity;

  return (
    <>
      <div className="modalItem__container">
        <div className="modalItem__inner">
          <figure className="modalItem__image">
            <img
              className="modalItem__image-1"
              src={item.image.thumbnail}
              alt="Product-Image"
            />
          </figure>
          <div>
            <h4 className="modalItem__title">{name}</h4>
            <span className="modalItem__data">
              <p className="modalItem__quantity">{quantity}x</p>
              <p className="modalItem__subprice">@ ${price.toFixed(2)}</p>
            </span>
          </div>
        </div>
        <p className="modalItem__total">${subTotal.toFixed(2)}</p>
      </div>
      <hr className="modalItem__line" />
    </>
  );
}
