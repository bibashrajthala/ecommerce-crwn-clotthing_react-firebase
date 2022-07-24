import { createContext, useState, useEffect } from "react";
import { addCollectionAndDocuments } from "../utils/firebase/firebase.utils.js";

import SHOP_DATA from "../shop-data.js";

export const ProductContext = createContext({
  products: [],
});

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const value = { products };

  useEffect(() => {
    addCollectionAndDocuments("categories", SHOP_DATA);
  }, []);

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
