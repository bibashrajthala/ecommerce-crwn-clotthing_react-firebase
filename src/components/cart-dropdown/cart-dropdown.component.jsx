import Button from "../../components/button/button.component";

import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items"></div>
      <Button label="Go To Checkout" />
    </div>
  );
};

export default CartDropdown;
