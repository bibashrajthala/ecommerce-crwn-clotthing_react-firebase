import { useCallback, useMemo, useState } from "react";
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

  const goToCheckoutHandler = useCallback(() => {
    navigate("/checkout");
  }, []);
  // navigate dont change so dont need to add it as dependency, but to remove warining you can add

  // just like useCallback(), but this hook memoizes a returned value instead of whole function and it renruns the callback dunciton only when dependency array changes justlike in useCallback() other wise it gives same memoized vzlue
  const val = useMemo(() => {
    console.log("start");
    console.log("expensive operation - 5 second delay");
    console.log("end");
    return count + 100;
  }, [count]);

  return (
    <CartDropdownContainer>
      {val}
      {/*<CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
        </CartItems> 
      <Button label="Go To Checkout" onClick={goToCheckoutHandler} />
      */}
      <Button label="Go To Checkout" onClick={() => setCount(count + 1)} />
    </CartDropdownContainer>
  );
};

export default CartDropdown;
