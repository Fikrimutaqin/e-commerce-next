import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { setCategories } from "@/store/slices/categorySlice";
import { setPriceRanges } from "@/store/slices/priceSlice";
import { Product } from "@/services/productService";

export const useProductFilters = (products: Product[] | undefined) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (products?.length) {
      // --- CATEGORY LOGIC ---
      const uniqueCategoryNames = Array.from(
        new Set(products.map((item) => item.category))
      );
      
      const formattedCategories = uniqueCategoryNames.map((cat) => ({
        label: cat.charAt(0).toUpperCase() + cat.slice(1),
        value: cat,
      }));

      dispatch(
        setCategories([
          { label: "All Categories", value: "" },
          ...formattedCategories,
        ])
      );

      // --- PRICE RANGE LOGIC ---
      const prices = products.map((p) => p.price);
      const maxPrice = Math.ceil(Math.max(...prices));
      const step = Math.ceil(maxPrice / 4);

      const dynamicPriceRanges = [
        { label: "All Price", value: { min: 0, max: 1000000 } },
        { label: `$0 - $${step}`, value: { min: 0, max: step } },
        { label: `$${step} - $${step * 2}`, value: { min: step, max: step * 2 } },
        { label: `$${step * 2} - $${step * 3}`, value: { min: step * 2, max: step * 3 } },
        { label: `$${step * 3}+`, value: { min: step * 3, max: 1000000 } },
      ];

      dispatch(setPriceRanges(dynamicPriceRanges));
    }
  }, [products, dispatch]);
};
