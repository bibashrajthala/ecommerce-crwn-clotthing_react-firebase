import { useContext, Fragment } from "react";
import { CategoriesContext } from "../../context/categories.context";

import ProductCard from "../../components/product-card/product-card.component";

import "./shop.styles.scss";

const Shop = () => {
  const { categoriesMap } = useContext(CategoriesContext);

  console.log(categoriesMap);
  console.log(Object.keys(categoriesMap));
  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => (
        <Fragment key={title}>
          <h2>{title}</h2>
          <div className="products-card-container">
            {console.log(categoriesMap[title])}
            {categoriesMap[title].map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Fragment>
      ))}

      {/* {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}  */}
    </Fragment>
  );
};

export default Shop;
