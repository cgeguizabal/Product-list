import { ActiveButton } from "./ActiveButton";
import { useCartStore } from "../store/cartStore";
import { useEffect, useState } from "react";

export function ProductItem({ products }) {
  const [width, setWidth] = useState(window.innerWidth);
  const cart = useCartStore((state) => state.cart);

  const handleAddProduct = useCartStore((state) => state.handleAddProduct);

  const currentNumber =
    cart.find((item) => item.id == products.id)?.quantity || 0;

  const currentProduct =
    cart.find((item) => item.id === products.id) || products;

  useEffect(() => {
    const handleWidth = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleWidth);
  }, []);

  return (
    <div className="product__container">
      <div className="product__image">
        <figure
          className={
            currentNumber === 0
              ? "product__image-container"
              : "product__image-container--selected"
          }
        >
          <img
            className="product__image-container-image"
            src={width > 576 ? products.image.desktop : products.image.mobile}
            alt="Product-Image"
          />
        </figure>
        {currentNumber === 0 ? (
          <>
            <button
              className="product__button"
              onClick={() => handleAddProduct(products)}
            >
              <img
                className="product__button-icon"
                src="icon-add-to-cart.svg"
                alt="icon"
              />
              Add to Cart
            </button>
          </>
        ) : (
          <>
            <ActiveButton
              currentProduct={currentProduct}
              currentNumber={currentNumber}
            />{" "}
          </>
        )}
      </div>
      <div className="product__info">
        <h6 className="product__info-category">{products.category}</h6>
        <h4 className="product__info-name">{products.name}</h4>
        <p className="product__info-price">${products.price.toFixed(2)}</p>
      </div>
    </div>
  );
}
