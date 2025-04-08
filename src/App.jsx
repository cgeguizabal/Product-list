import Products from "../src/data/Products.json";
import { useState } from "react";
import { LeftContent } from "./Components/LeftContent";
import { ProductItem } from "./Components/ProductItem";
import { RightContent } from "./Components/RightContent";
import { CartList } from "./Components/CartList";
import { Modal } from "./Components/Modal";

function App() {
  // const cartStorage = localStorage.getItem("localCartStorage")
  //   ? JSON.parse(localStorage.getItem("localCartStorage"))
  //   : [];

  // const [cart, setCart] = useState(cartStorage);
  // const [total, setTotal] = useState(0);

  // const [quantity, setQuantity] = useState(0);

  //I get current total

  //I get current Quantity

  //OLDFUNCTION
  // useEffect(() => {
  //   const newQuantity = cart.reduce(function (accumulator, current) {
  //     return accumulator + current.quantity;
  //   }, 0);
  //   setQuantity(newQuantity);
  // });

  //OLDFUNCTION
  // const handleAddProduct = (product) => {
  //   if (cart.some((item) => item.id === product.id)) {
  //     setCart(
  //       cart.map((item) => {
  //         if (item.id === product.id) {
  //           return { ...item, quantity: item.quantity + 1 };
  //         } else {
  //           return item;
  //         }
  //       })
  //     );
  //   } else {
  //     setCart([
  //       ...cart,
  //       {
  //         id: product.id,
  //         name: product.name,
  //         price: product.price,
  //         quantity: 1,
  //       },
  //     ]);
  //   }
  // };

  //OLD FUNCTION
  // const handleDeleteItem = (product) => {
  //   if (cart.some((item) => item.id === product.id)) {
  //     if (product.quantity > 1) {
  //       setCart(
  //         cart.map((item) => {
  //           if (item.id === product.id) {
  //             return { ...item, quantity: item.quantity - 1 };
  //           } else {
  //             return item;
  //           }
  //         })
  //       );
  //     } else {
  //       setCart(cart.filter((item) => item.id !== product.id));
  //     }
  //   }
  // };

  // LOCALSTORAGE
  // useEffect(() => {
  //   localStorage.setItem("localCartStorage", JSON.stringify(cart));
  // }, [cart]);

  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? "auto" : "hidden";
  };

  return (
    <>
      <div className="App__container">
        <LeftContent>
          <ProductList />
        </LeftContent>
        <RightContent>
          {" "}
          <CartList handleModal={handleModal} />
        </RightContent>
      </div>
      {isOpen ? <Modal handleModal={handleModal} /> : ""}
    </>
  );
}

function ProductList() {
  return (
    <>
      <section className="desserts">
        {Products.map((products, index) => {
          return <ProductItem products={products} key={index + 1} />;
        })}
      </section>
    </>
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
