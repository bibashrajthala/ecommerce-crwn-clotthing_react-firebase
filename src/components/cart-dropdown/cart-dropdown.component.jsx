import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Button from "../../components/button/button.component";
import CartItem from "../cart-item/cart-item.component";

import { selectCartItems } from "../../store/cart/cart.selector";

import {
  CartDropdownContainer,
  CartItems,
  EmptyMessage,
} from "./cart-dropdown.styles";

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();

  const [count, setCount] = useState(0);

  // useCallback is used to memoize whole funciton(not just the returned value of function , but the whole func ) so that there is no extra unnecssary initilazation and running of funciton during re-render of component
  // ie the callback function inside of useCallback only re-initialize and re-run only if there is some change in function otherwise , it always runs the same memoized function
  const goToCheckoutHandler = useCallback(() => {
    navigate("/checkout");
  }, []);

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button label="Go To Checkout" onClick={goToCheckoutHandler} />
    </CartDropdownContainer>
  );
};

export default CartDropdown;
