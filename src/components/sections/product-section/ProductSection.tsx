import BasicButton from "@/components/common/buttons/BasicButton";
import BasicCard from "@/components/common/cards/BasicCard";
import Image from "next/image";
import { useState } from "react";
import { Product } from "@/services/productService";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { useParams } from "next/navigation";

interface ProductSectionProps {
    selectedCategory?: string;
    products?: Product[];
    isLoading?: boolean;
    isError?: boolean;
    error?: unknown;
    onLoadMore?: () => void;
    isFetching?: boolean;
    onSort?: (type: string) => void;
    valueSort?: string;
}

export default function ProductSection({
    selectedCategory,
    products,
    isLoading,
    isError,
    error,
    onLoadMore,
    isFetching,
    onSort,
    valueSort
}: ProductSectionProps) {
    const { id } = useParams();
    const isMobile = useIsMobile();
    const [switchType, setSwitchType] = useState('grid3');
    const [likedProducts, setLikedProducts] = useState<Set<number>>(new Set());
    const [openSort, setOpenSort] = useState(false);

    const handleSwitchType = (type: string) => {
        setSwitchType(type);
    }

    const toggleLike = (productId: number) => {
        setLikedProducts((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(productId)) {
                newSet.delete(productId);
            } else {
                newSet.add(productId);
            }
            return newSet;
        });
    }

    const _RenderContentProduct = (type: string) => {
        if (isLoading) return <div className="col-span-full py-10 text-center text-secondary">Loading products...</div>;
        if (isError) return <div className="col-span-full py-10 text-center text-red-500">Error: {(error as Error).message}</div>;
        if (!products || products.length === 0) return <div className="col-span-full py-10 text-center text-secondary">No products found.</div>;

        return (
            <>
                {products.map((product, index) => {
                    const isLiked = likedProducts.has(product.id);
                    const showBestDeal = product.rating.rate >= 4;
                    const showPromo = product.price < 50;

                    return (
                        <BasicCard
                            key={product.id}
                            image={product.image}
                            priority={index < 3}
                            className={type === 'list' ? 'flex-row! h-auto md:h-[220px]' : ''}
                            imageClassName={type === 'list' ? 'w-[140px]! md:w-[220px]! h-full! bg-slate-50' : 'h-[250px]! object-contain! p-4'}
                            badge={
                                <>
                                    {showBestDeal && (
                                        <div className="bg-yellow text-white text-center text-[10px] font-bold px-2 py-1 rounded-[4px] uppercase shadow-sm w-[90px] mb-1">
                                            Best Deal
                                        </div>
                                    )}
                                    {showPromo && (
                                        <div className="bg-green text-white text-center text-[10px] font-bold px-2 py-1 rounded-[4px] uppercase shadow-sm w-[90px]">
                                            Promo
                                        </div>
                                    )}
                                </>
                            }
                            action={
                                <button
                                    className={`w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md border-none cursor-pointer hover:scale-110 transition-transform group ${isLiked ? 'animate-heartbeat' : ''}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        toggleLike(product.id);
                                    }}
                                >
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 14 14"
                                        fill={isLiked ? "#EF4444" : "none"}
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="transition-colors duration-300"
                                    >
                                        <path
                                            d="M11.0832 8.16667C11.9523 7.315 12.8332 6.29417 12.8332 4.95833C12.8332 4.10743 12.4952 3.29138 11.8935 2.6897C11.2918 2.08802 10.4757 1.75 9.62484 1.75C8.59817 1.75 7.87484 2.04167 6.99984 2.91667C6.12484 2.04167 5.4015 1.75 4.37484 1.75C3.52393 1.75 2.70788 2.08802 2.1062 2.6897C1.50452 3.29138 1.1665 4.10743 1.1665 4.95833C1.1665 6.3 2.0415 7.32083 2.9165 8.16667L6.99984 12.25L11.0832 8.16667Z"
                                            stroke={isLiked ? "#EF4444" : "#64748B"}
                                            strokeWidth="1.16667"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>
                            }
                        >
                            <div className={`flex flex-col flex-1 p-4 ${type === 'list' ? 'justify-between py-2 h-52' : 'gap-y-2'}`}>
                                <div>
                                    {/* Rating */}
                                    <div className="flex flex-row items-center gap-x-2">
                                        <div className="flex flex-row gap-x-0.5">
                                            {[...Array(Math.round(product.rating.rate))].map((_, i) => (
                                                <Image key={i} src="/images/icons/ic-star.svg" alt="star" width={14} height={14} style={{ width: 'auto', height: 'auto' }} />
                                            ))}
                                        </div>
                                        <p className="text-secondary text-xs font-medium">
                                            {product.rating.rate} ({product.rating.count})
                                        </p>
                                    </div>
                                    {/* Name */}
                                    <button
                                        onClick={() => window.location.href = `/product/${product.id}`}
                                        className="text-left border-none bg-transparent cursor-pointer p-0 w-fit"
                                    >
                                        <p className="text-black font-bold text-lg mt-1 line-clamp-1 hover:text-primary transition-colors">{product.title}</p>
                                    </button>
                                    {/* Category */}
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            window.location.href = `/category/${encodeURIComponent(product.category)}`;
                                        }}
                                        className="text-left border-none bg-transparent cursor-pointer p-0 w-full hover:text-primary transition-colors"
                                    >
                                        <p className="text-secondary text-[10px] font-semibold tracking-[1] uppercase hover:text-primary">{product.category}</p>
                                    </button>
                                    {/* Description */}
                                    <p className="text-secondary text-sm mt-1 line-clamp-2 md:line-clamp-2">{product.description}</p>
                                </div>

                                <div className="flex flex-row justify-between items-end w-full mt-4">
                                    <div className="flex flex-col">
                                        <p className="text-secondary text-[10px]">Starting at</p>
                                        <p className="text-primary font-bold text-lg">${product.price.toLocaleString()}</p>
                                    </div>
                                    <button
                                        onClick={() => window.location.href = `/product/${product.id}`}
                                        className="flex flex-row items-center gap-x-1 text-primary font-semibold text-sm border-none bg-transparent cursor-pointer hover:translate-x-1 transition-transform"
                                    >
                                        <span>View Detail</span>
                                        <Image src="/images/icons/ic-chevron-right.svg" alt="view" width={14} height={14} style={{ width: 'auto', height: 'auto' }} />
                                    </button>
                                </div>
                            </div>
                        </BasicCard>
                    );
                })}
            </>
        );
    }

    return (
        <div className="w-full flex flex-col gap-y-8">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row justify-between items-center w-full">
                <p className="text-black font-semibold text-xl text-left px-0 lg:px-0 mt-3 lg:mt-0 w-full lg:w-80 capitalize">{selectedCategory ?? 'All Category'}</p>

                <div className="flex flex-row justify-between lg:justify-start items-center lg:gap-x-4 w-full lg:w-auto">
                    <div className="relative">
                        <button
                            onClick={() => setOpenSort(!openSort)}
                            type="button"
                            className="flex flex-row gap-x-2 items-center bg-transparent border-none cursor-pointer group"
                        >
                            <p className="text-black font-medium text-sm group-hover:text-primary transition-colors">Sort by</p>
                            <Image
                                src="/images/icons/ic-chevron-bottom.svg"
                                alt="Icon Sort by"
                                width={12}
                                height={12}
                                className={`transition-transform duration-300 ${openSort ? 'rotate-180' : ''}`}
                                style={{ width: 'auto', height: 'auto' }}
                            />
                        </button>

                        {openSort && (
                            <div className={`absolute ${isMobile ? 'left-0' : 'right-0'} mt-2 w-[160px] bg-white rounded-xl shadow-2xl z-20 animate-in fade-in slide-in-from-top-2 duration-200`}>
                                <button
                                    onClick={() => {
                                        setOpenSort(false);
                                        onSort?.("low-to-high");
                                    }}
                                    className={`w-full text-left px-4 py-2 text-sm border-none cursor-pointer ${valueSort === "low-to-high" ? "bg-primary text-white!" : "text-black"}`}
                                >
                                    Price: Low to High
                                </button>
                                <button
                                    onClick={() => {
                                        setOpenSort(false);
                                        onSort?.("high-to-low");
                                    }}
                                    className={`w-full text-left px-4 py-2 text-sm border-none cursor-pointer ${valueSort === "high-to-low" ? "bg-primary text-white!" : "text-black"}`}
                                >
                                    Price: High to Low
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-row lg:w-30 lg:justify-center items-center border border-gray-200 rounded-lg lg:overflow-hidden">
                        <BasicButton
                            onClick={() => { handleSwitchType('grid3') }}
                            type="button"
                            className={
                                `p-2! lg:px-3! rounded-none! border-0! ${switchType === 'grid3' ? 'bg-slate-100' : 'bg-transparent'} border-r! border-gray-200! hover:bg-slate-100 transition-colors cursor-pointer w-auto! h-auto! bg-none!`
                            }>
                            <Image
                                src="/images/icons/ic-grid-3.svg"
                                alt="Grid 3"
                                width={20}
                                height={20}
                                style={{ width: 'auto', height: 'auto' }} />
                        </BasicButton>
                        <BasicButton
                            onClick={() => { handleSwitchType('grid2') }}
                            type="button"
                            className={`
                                 p-2! lg:px-3! rounded-none! border-0! ${switchType === 'grid2' ? 'bg-slate-100' : 'bg-transparent'} border-r! border-gray-200! hover:bg-slate-50 transition-colors cursor-pointer w-auto! h-auto! bg-none!`
                            }>
                            <Image
                                src="/images/icons/ic-grid-2.svg"
                                alt="Grid 2"
                                width={20}
                                height={20}
                                style={{ width: 'auto', height: 'auto' }} />
                        </BasicButton>
                        <BasicButton
                            onClick={() => { handleSwitchType('list') }}
                            type="button"
                            className={`
                                 p-2! lg:px-3! border-0 ${switchType === 'list' ? 'bg-slate-100' : 'bg-transparent'} hover:bg-slate-50 transition-colors cursor-pointer w-auto! h-auto! bg-none! hidden lg:block
                            `}>
                            <Image
                                src="/images/icons/ic-listing.svg"
                                alt="List"
                                width={20}
                                height={20}
                                style={{ width: 'auto', height: 'auto' }} />
                        </BasicButton>
                    </div>
                </div>

            </div>
            {/* List Product */}
            <div className={`grid gap-4 ${switchType === 'grid3' ? 'grid-cols-1 md:grid-cols-3' :
                switchType === 'grid2' ? 'grid-cols-1 md:grid-cols-2' :
                    'grid-cols-1'
                }`}>
                {_RenderContentProduct(switchType)}
            </div>
            {products && products.length < 20 && !id && (
                <BasicButton
                    onClick={() => onLoadMore?.()}
                    type="button"
                    className="h-12 bg-transparent cursor-pointer border-primary border-2 text-black! font-semibold text-base rounded-lg w-[200px]! mx-auto disabled:opacity-50"
                    disabled={isFetching}
                >
                    {isFetching ? "Loading..." : "Show More Products"}
                </BasicButton>
            )}
        </div>
    )
}
