import { useCartStore } from "../store/cartStore";

export function ActiveButton({ currentProduct, currentNumber }) {
  const handleAddProduct = useCartStore((state) => state.handleAddProduct);
  const handleDeleteItem = useCartStore((state) => state.handleDeleteItem);
  return (
    <>
      <div className="button__container">
        <button
          className="button__deleteItem"
          onClick={() => handleDeleteItem(currentProduct)}
        >
          <div className="button__deleteItem-icon"></div>
        </button>
        <p className="products__number">{currentNumber}</p>
        <button
          className="button__addItem"
          onClick={() => handleAddProduct(currentProduct)}
        >
          <div className="button__addItem-icon"></div>
        </button>
      </div>
    </>
  );
}
