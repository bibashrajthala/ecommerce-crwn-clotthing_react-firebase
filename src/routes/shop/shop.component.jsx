import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import CategoriesPreview from "../categories-preview/categories-preview";
import Category from "../category/category.component";

import { fetchCategoriesStart } from "../../store/categories/categories.action.js";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesStart());
  }, [dispatch]);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} /> */}
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
