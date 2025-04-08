import { ActiveButton } from "./ActiveButton";
import { useCartStore } from "../store/cartStore";

export function ProductItem({ products }) {
  const cart = useCartStore((state) => state.cart);
  const handleDeleteItem = useCartStore((state) => state.handleDeleteItem);
  const handleAddProduct = useCartStore((state) => state.handleAddProduct);

  const currentNumber =
    cart.find((item) => item.id == products.id)?.quantity || 0;

  const currentProduct =
    cart.find((item) => item.id === products.id) || products;

  return (
    <div className="product__container">
      <div className="product__image">
        <figure className="product__image-container">
          <img
            className={
              currentNumber === 0
                ? "product__image-container-image"
                : "product__image-container-image--selected"
            }
            src={products.image.desktop}
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
              handleAddProduct={handleAddProduct}
              handleDeleteItem={handleDeleteItem}
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
