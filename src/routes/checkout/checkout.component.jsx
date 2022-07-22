import { useContext } from "react";

import { CartContext } from "../../context/cart.context";

import "./checkout.styles.scss";

const Checkout = () => {
  const { cartItems, addItemToCart } = useContext(CartContext);
  return (
    <div>
      {cartItems.map((cartItem) => {
        const { id, name, quantity } = cartItem;
        return (
          <div key={id}>
            <h2>{name}</h2>
            <h2>{quantity}</h2>
            <span>Decrement</span> <br />
            <span onClick={() => addItemToCart(cartItem)}>Increment</span>
          </div>
        );
      })}
    </div>
  );
};

export default Checkout;
