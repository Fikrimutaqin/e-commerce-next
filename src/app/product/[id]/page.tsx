"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { productService } from "@/services/productService";
import Image from "next/image";
import { useState, useMemo } from "react";
import BasicButton from "@/components/common/buttons/BasicButton";
import ProductSection from "@/components/sections/product-section/ProductSection";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export default function ProductDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const isMobile = useIsMobile();
    const [quantity, setQuantity] = useState(1);
    const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [isWishlisted, setIsWishlisted] = useState(false);

    const toggleWishlist = () => {
        setIsWishlisted(!isWishlisted);
    };

    const { data: product, isLoading, isError } = useQuery({
        queryKey: ["product", id],
        queryFn: () => productService.getProductById(id as string),
    });

    const productImages = product ? [product.image, product.image, product.image, product.image] : [];

    const handleNext = () => {
        setActiveImageIndex((prev) => (prev + 1) % productImages.length);
    };

    const handlePrev = () => {
        setActiveImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
    };

    const { data: relatedProductsData } = useQuery({
        queryKey: ["products-related", product?.category],
        queryFn: () => productService.getProductsByCategory(product!.category, 5),
        enabled: !!product,
    });

    const relatedProducts = useMemo(() => {
        if (!relatedProductsData || !product) return [];
        return relatedProductsData.filter((p) => p.id !== product.id).slice(0, 4);
    }, [relatedProductsData, product]);

    // Add to Cart Mutation
    const addToCartMutation = useMutation({
        mutationFn: () => productService.addToCartApi(1, [{ productId: product!.id, quantity }]),
        onSuccess: () => {
            dispatch(addToCart({ product: product!, quantity }));
            toast.success("Added to cart successfully!");
        },
        onError: () => {
            toast.error("Failed to add to cart.");
        }
    });

    const handleAddToCart = () => {
        if (!product) return;
        addToCartMutation.mutate();
    };

    if (isLoading) return <div className="flex justify-center items-center h-screen text-secondary">Loading product...</div>;
    if (isError || !product) return <div className="flex justify-center items-center h-screen text-red-500">Product not found.</div>;

    const toggleAccordion = (key: string) => {
        setActiveAccordion(activeAccordion === key ? null : key);
    };

    return (
        <main className="flex flex-col w-full min-h-screen bg-white">
            {/* Breadcrumbs */}
            <nav className="flex flex-row items-center gap-x-2 px-4 mt-5 lg:px-[215px] py-4 text-xs text-secondary font-medium">
                <span className="cursor-pointer hover:text-black" onClick={() => router.push("/")}>Home</span>
                <span>/</span>
                <span className="cursor-pointer hover:text-primary uppercase font-bold" onClick={() => router.push(`/category/${encodeURIComponent(product.category)}`)}>
                    {product.category}
                </span>
                <span>/</span>
                <span className="text-black font-semibold truncate max-w-[150px]">{product.title}</span>
            </nav>

            {/* Product Detail Section */}
            <section className="flex flex-col lg:flex-row w-full px-4 lg:px-[215px] py-5 lg:gap-x-16">

                {/* Left: Image Gallery */}
                <div className="flex flex-col w-full lg:w-1/2 gap-y-4">
                    <div className="relative aspect-square w-full bg-slate-50 rounded-2xl overflow-hidden group">
                        <Image
                            src={productImages[activeImageIndex]}
                            alt={product.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-contain p-8 lg:p-16 transition-all duration-500 group-hover:scale-105"
                            priority
                        />
                        {/* Navigation Arrows */}
                        <button
                            onClick={handlePrev}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors z-10"
                        >
                            <Image src="/images/icons/ic-chevron-left.svg" alt="prev" width={20} height={20} style={{ width: 'auto', height: 'auto' }} />
                        </button>
                        <button
                            onClick={handleNext}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors z-10"
                        >
                            <Image src="/images/icons/ic-chevron-right.svg" alt="next" width={20} height={20} style={{ width: 'auto', height: 'auto' }} />
                        </button>
                        {/* Page Indicator */}
                        <div className="absolute bottom-4 right-4 bg-black/50 text-white text-[10px] px-2 py-1 rounded-md font-medium">
                            {activeImageIndex + 1} / {productImages.length}
                        </div>
                    </div>

                    {/* Thumbnails */}
                    <div className="flex flex-row gap-x-3 overflow-x-auto pb-2 no-scrollbar">
                        {productImages.map((img, i) => (
                            <div
                                key={i}
                                onClick={() => setActiveImageIndex(i)}
                                className={`relative shrink-0 w-20 lg:w-24 aspect-square rounded-xl border-2 cursor-pointer transition-all ${activeImageIndex === i ? 'border-primary' : 'border-transparent hover:border-gray-200'}`}
                            >
                                <Image src={img} alt={`thumb-${i}`} fill sizes="100px" className="object-contain p-2" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Product Info */}
                <div className="flex flex-col w-full lg:w-1/2 mt-8 lg:mt-0">
                    <h1 className="text-3xl lg:text-4xl font-bold text-black leading-tight">{product.title}</h1>
                    <p className="text-secondary text-sm lg:text-base mt-4 leading-relaxed line-clamp-4">
                        {product.description}
                    </p>

                    <div className="flex flex-row items-center gap-x-4 mt-6">
                        <span className="text-2xl lg:text-3xl font-bold text-black">${product.price.toLocaleString()}</span>
                        <span className="text-lg text-secondary line-through">${(product.price * 2).toFixed(2)}</span>
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-col gap-y-4 mt-8 pb-8 border-b border-gray-100">
                        <div className="flex flex-col gap-y-2">
                            <span className="text-xs font-bold text-black uppercase tracking-wider">Details</span>
                            <p className="text-sm text-secondary">-</p>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <span className="text-xs font-bold text-black uppercase tracking-wider">Category</span>
                            <div className="flex flex-row gap-x-2">
                                <span className="px-3 py-1 bg-slate-100 text-secondary text-[10px] font-bold rounded-md uppercase">{product.category}</span>
                                <span className="px-3 py-1 bg-green/10 text-green text-[10px] font-bold rounded-md uppercase">Bestseller</span>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-y-4 mt-8">
                        <div className="flex flex-row gap-x-4">
                            {/* Quantity Selector */}
                            <div className="flex flex-row items-center bg-slate-50 rounded-xl px-2 h-14 border border-gray-100">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-10 h-10 flex items-center justify-center text-xl font-medium hover:text-primary transition-colors"
                                >-</button>
                                <span className="w-10 text-center font-bold text-lg">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-10 h-10 flex items-center justify-center text-xl font-medium hover:text-primary transition-colors"
                                >+</button>
                            </div>
                            {/* Wishlist */}
                            <button
                                onClick={toggleWishlist}
                                className="flex-1 lg:flex-none lg:w-[200px] flex flex-row items-center justify-center gap-x-2 h-14 rounded-xl border border-gray-200 hover:bg-slate-50 transition-all group"
                            >
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill={isWishlisted ? "#EF4444" : "none"}
                                    stroke={isWishlisted ? "#EF4444" : "currentColor"}
                                    strokeWidth="2"
                                    className={`transition-all duration-300 ${isWishlisted ? 'animate-heartbeat text-red-500' : 'text-secondary group-hover:text-red-500'}`}
                                >
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.72-8.72 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                </svg>
                                <span className={`text-sm font-semibold transition-colors ${isWishlisted ? 'text-red-500' : 'text-black'}`}>
                                    {isWishlisted ? "Wishlisted" : "Wishlist"}
                                </span>
                            </button>
                        </div>

                        {/* Add to Cart */}
                        <BasicButton
                            onClick={handleAddToCart}
                            disabled={addToCartMutation.isPending}
                            type="button"
                            className="w-full h-14 bg-primary text-white! font-bold text-lg rounded-xl hover:scale-[1.01] active:scale-[0.99] transition-all shadow-lg shadow-primary/20 disabled:opacity-70"
                        >
                            {addToCartMutation.isPending ? "Adding..." : "Add to Cart"}
                        </BasicButton>
                    </div>

                    {/* Stock & Material Info */}
                    <div className="flex flex-col gap-y-3 mt-8 text-sm">
                        <div className="flex justify-between items-center">
                            <span className="text-secondary">SKU:</span>
                            <span className="font-bold text-black uppercase">BT-001-{product.id}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-secondary">Material:</span>
                            <span className="font-bold text-black">-</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-secondary">Stock:</span>
                            <span className="font-bold text-black">0</span>
                        </div>
                    </div>

                    {/* Accordions */}
                    <div className="flex flex-col mt-8 border-t border-gray-100">
                        <button
                            onClick={() => toggleAccordion('info')}
                            className="flex justify-between items-center w-full py-4 border-b border-gray-100 group"
                        >
                            <span className="text-sm font-bold text-black uppercase tracking-wider">Additional Info</span>
                            <Image src="/images/icons/ic-chevron-right.svg" alt="arrow" width={16} height={16} className={`transition-transform duration-300 ${activeAccordion === 'info' ? 'rotate-90' : ''}`} />
                        </button>
                        {activeAccordion === 'info' && (
                            <div className="py-4 text-sm text-secondary animate-in fade-in slide-in-from-top-2">
                                -
                            </div>
                        )}

                        <button
                            onClick={() => toggleAccordion('details')}
                            className="flex justify-between items-center w-full py-4 border-b border-gray-100 group"
                        >
                            <span className="text-sm font-bold text-black uppercase tracking-wider">Details</span>
                            <Image src="/images/icons/ic-chevron-right.svg" alt="arrow" width={16} height={16} className={`transition-transform duration-300 ${activeAccordion === 'details' ? 'rotate-90' : ''}`} />
                        </button>
                        {activeAccordion === 'details' && (
                            <div className="py-4 text-sm text-secondary animate-in fade-in slide-in-from-top-2">
                                -
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Related Products Section */}
            <section className="flex flex-col w-full px-4 lg:px-[215px] py-16 gap-y-8 bg-slate-50/50">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-black">You might also like</h2>
                    <button className="flex items-center gap-x-2 text-primary font-semibold hover:gap-x-3 transition-all" onClick={() => router.push("/")}>
                        <span>More Products</span>
                        <Image src="/images/icons/ic-chevron-right.svg" alt="more" width={16} height={16} />
                    </button>
                </div>
                <ProductSection
                    products={relatedProducts}
                    isLoading={false}
                    selectedCategory={`${relatedProducts[0]?.category}`}
                />
            </section>
        </main>
    );
}
