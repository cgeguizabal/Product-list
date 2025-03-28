import { useEffect } from "react";
import Products from "../src/data/Products.json";
import { useState } from "react";

function App() {
  const cartStorage = localStorage.getItem("localCartStorage")
    ? JSON.parse(localStorage.getItem("localCartStorage"))
    : [];

  const [cart, setCart] = useState(cartStorage);
  const [total, setTotal] = useState(0);
  const [quantity, setQuantity] = useState(0);

  //I get current total
  useEffect(() => {
    const newTotal = cart.reduce(function (accumulator, current) {
      return accumulator + current.price * current.quantity;
    }, 0);
    setTotal(newTotal);
  });

  //I get current Quantity

  useEffect(() => {
    const newQuantity = cart.reduce(function (accumulator, current) {
      return (accumulator = current.quantity);
    }, 0);
    setQuantity(newQuantity);
  });

  const handleAddProduct = (product) => {
    if (cart.some((item) => item.id === product.id)) {
      setCart(
        cart.map((item) => {
          if (item.id === product.id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        })
      );
    } else {
      setCart([
        ...cart,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        },
      ]);
    }
  };

  const handleDeleteItem = (product) => {
    if (cart.some((item) => item.id === product.id)) {
      if (product.quantity > 1) {
        setCart(
          cart.map((item) => {
            if (item.id === product.id) {
              return { ...item, quantity: item.quantity - 1 };
            } else {
              return item;
            }
          })
        );
      } else {
        setCart(cart.filter((item) => item.id !== product.id));
      }
    }
  };
  useEffect(() => {
    localStorage.setItem("localCartStorage", JSON.stringify(cart));
  }, [cart]);

  return (
    <>
      <div className="App__container">
        <LeftContent>
          <ProductList
            onAdd={handleAddProduct}
            cart={cart}
            handleDeleteItem={handleDeleteItem}
          />
        </LeftContent>
        <RightContent cart={cart} quantity={quantity}>
          {" "}
          <CartList
            cart={cart}
            total={total}
            handleDeleteItem={handleDeleteItem}
          />
        </RightContent>
      </div>
    </>
  );
}

function LeftContent({ children }) {
  return (
    <div className="LeftContent__container">
      <h1 className="LeftContent__title">Desserts</h1>
      {children}
    </div>
  );
}

function ProductList({ onAdd, cart, handleDeleteItem }) {
  return (
    <>
      <section className="desserts">
        {Products.map((products, index) => {
          return (
            <ProductItem
              products={products}
              key={index + 1}
              onAdd={onAdd}
              cart={cart}
              handleDeleteItem={handleDeleteItem}
            />
          );
        })}
      </section>
    </>
  );
}

function ProductItem({ products, onAdd, cart, handleDeleteItem }) {
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
            <button className="product__button" onClick={() => onAdd(products)}>
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
              onAdd={onAdd}
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

function ActiveButton({
  onAdd,
  currentProduct,
  currentNumber,
  handleDeleteItem,
}) {
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
          onClick={() => onAdd(currentProduct)}
        >
          <div className="button__addItem-icon"></div>
        </button>
      </div>
    </>
  );
}

function RightContent({ children, cart, quantity }) {
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

function CartList({ cart, total, handleDeleteItem }) {
  return (
    <div className="RightContent__container">
      {cart.map((item, index) => {
        return (
          <CartItem key={index + 1} item={item} onDelete={handleDeleteItem} />
        );
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
        <button className="cartlist__button">Confirm Order</button>
      </div>
    </div>
  );
}

function CartItem({ item, onDelete }) {
  const { name, price, quantity } = item;
  let subTotal = price * quantity;

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
          onClick={() => onDelete(item)}
        >
          <div className="cartItem__delete"></div>
        </button>
      </div>
      <hr className="cartItem__line" />
    </section>
  );
}

function Footer() {
  <div className="attribution">
    Challenge by{" "}
    <a href="https://www.frontendmentor.io?ref=challenge">Frontend Mentor</a>.
    Coded by <a href="#">Your Name Here</a>.
  </div>;
}
export default App;
