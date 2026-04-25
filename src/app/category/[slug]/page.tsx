"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { productService } from "@/services/productService";
import ProductSection from "@/components/sections/product-section/ProductSection";

export default function CategoryPage() {
    const { slug } = useParams();
    // Decode slug if it contains spaces or special chars
    const categoryName = decodeURIComponent(slug as string);

    const [sortBy, setSortBy] = useState("");
    const [limit, setLimit] = useState(10);

    const { data: products, isLoading, isError, error, isFetching } = useQuery({
        queryKey: ["products-category", categoryName, limit],
        queryFn: () => productService.getProductsByCategory(categoryName, limit),
    });

    const loadMore = () => {
        setLimit((prev) => prev + 10);
    };

    // Logic Sorting
    const sortedProducts = useMemo(() => {
        if (!products) return [];
        const result = [...products];

        if (sortBy === "low-to-high") {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === "high-to-low") {
            result.sort((a, b) => b.price - a.price);
        }
        return result;
    }, [products, sortBy]);

    return (
        <main className="flex flex-col w-full min-h-screen bg-white">
            {/* Breadcrumbs & Title */}
            <section className="w-full bg-slate-50 py-12 px-4 lg:px-[215px]">
                <div className="flex flex-col gap-y-2">
                    <nav className="flex flex-row items-center gap-x-2 text-xs text-secondary font-medium uppercase tracking-widest">
                        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-black font-bold">Category</span>
                        <span>/</span>
                        <span className="text-primary font-bold">{categoryName}</span>
                    </nav>
                    <h1 className="text-4xl lg:text-5xl font-bold text-black capitalize mt-4">
                        {categoryName}
                    </h1>
                    <p className="text-secondary text-sm lg:text-base max-w-2xl mt-2">
                        Explore our curated collection of {categoryName}. High-quality products selected just for you.
                    </p>
                </div>
            </section>

            {/* Product List Section */}
            <section className="flex flex-col w-full px-4 lg:px-[215px] py-16">
                <ProductSection
                    products={sortedProducts}
                    isLoading={isLoading}
                    isError={isError}
                    error={error}
                    onLoadMore={loadMore}
                    isFetching={isFetching}
                    selectedCategory={categoryName}
                    onSort={(val) => setSortBy(val)}
                    valueSort={sortBy}
                />
            </section>
        </main>
    );
}
