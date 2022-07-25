import { useContext } from "react";

import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../components/button/button.component";

import { CartContext } from "../../contexts/cart.context";

import {
  ProductCartContainer,
  Footer,
  Name,
  Price,
} from "./product-card.styles";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;

  const { addItemToCart } = useContext(CartContext);

  const addProductToCart = () => {
    addItemToCart(product);
  };

  return (
    <ProductCartContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        label="Add to Cart"
        onClick={addProductToCart}
      />
    </ProductCartContainer>
  );
};

export default ProductCard;
