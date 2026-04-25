"use client";
import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import HeroSection from "@/components/sections/hero-section/HeroSection";
import ProductSection from "@/components/sections/product-section/ProductSection";
import FilterSection from "@/components/sections/filter-section/FilterSection";

import { productService } from "@/services/productService";
import { useAppSelector } from "@/store/hooks";
import { useProductFilters } from "@/hooks/useProductFilters";
import NewsletterSection from "@/components/sections/newsletter-section/NewsletterSection";

export default function Home() {
  // Get data from Redux Store
  const category = useAppSelector((state) => state.category.categories);
  const priceRange = useAppSelector((state) => state.price.priceRanges);
  const { searchQuery } = useAppSelector((state) => state.app);

  const [limit, setLimit] = useState(9);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState<any>(undefined);
  const [sortBy, setSortBy] = useState("");

  const { data: products, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ['products', limit],
    queryFn: () => productService.getAllProducts(limit),
  });

  const loadMore = () => {
    setLimit((prev) => prev + 10);
  };

  // Logic Filtering and Sorting
  const filteredProducts = useMemo(() => {
    if (!products) return [];

    let result = products.filter((product) => {
      const matchCategory = selectedCategory === "" || product.category === selectedCategory;
      const matchPrice = !selectedPriceRange || (product.price >= selectedPriceRange.min && product.price <= selectedPriceRange.max);
      const matchSearch = searchQuery === "" || product.title.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchCategory && matchPrice && matchSearch;
    });

    // Sorting
    if (sortBy === "low-to-high") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "high-to-low") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, selectedCategory, selectedPriceRange, sortBy]);

  // Use custom hook to handle filter logic
  useProductFilters(products);


  return (
    <main className="flex flex-col w-full h-auto">
      {/* Hero Section */}
      <HeroSection />

      {/* Content Section */}
      <section id="content" className="flex flex-col items-center lg:items-start lg:flex-row justify-center w-full lg:px-[215px] px-4 lg:py-16 py-8 lg:gap-x-10 gap-y-4">
        {/* Filtering and sorting */}
        <div className="w-full lg:max-w-[280px] flex flex-col justify-start items-start">
          <FilterSection
            dataCategories={category}
            dataPriceRange={priceRange}
            onSelectCategory={(val) => { setSelectedCategory(val) }}
            onSelectPriceRange={(val) => { setSelectedPriceRange(val) }}
          />
        </div>
        {/* Product Section */}
        <div className="w-full flex flex-col justify-start items-start">
          <ProductSection
            products={filteredProducts}
            isLoading={isLoading}
            isError={isError}
            error={error}
            onLoadMore={loadMore}
            isFetching={isFetching}
            selectedCategory={category.find(c => c.value === selectedCategory)?.label || "All Category"}
            onSort={(val) => setSortBy(val)}
            valueSort={sortBy}
          />
        </div>
      </section>
      <NewsletterSection />
    </main>
  );
}
