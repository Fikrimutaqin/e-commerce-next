"use client";
import { useState } from "react";
import Image from "next/image";

import { FilterType, PriceValueInterface } from "@/types/filterType";
import { useIsMobile } from "@/hooks/useMediaQuery";
import CheckboxInput from "@/components/common/inputs/CheckboxInput";
import BasicButton from "@/components/common/buttons/BasicButton";

export default function FilterSection({ dataCategories, dataPriceRange, onSelectCategory, onSelectPriceRange }: FilterType) {
    const isMobile = useIsMobile();
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [selectedPriceRange, setSelectedPriceRange] = useState<PriceValueInterface | undefined>(undefined);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const _RenderFilterContentDesktop = () => {
        return (
            <div className="lg:w-[280px] w-full hidden flex-col lg:flex">
                <p className="text-primary text-base font-semibold tracking-[1px] uppercase pb-3">Category</p>
                <div className="flex flex-col w-full justify-start items-start mt-3 gap-y-2">
                    {dataCategories?.map((category) => (
                        <button className={`w-full cursor-pointer text-left ${selectedCategory === category.value ? "border-b-2 border-primary pb-2 animate-fade-in-up" : ""}`}
                            onClick={() => {
                                onSelectCategory(category.value)
                                setSelectedCategory(category.value)
                            }} key={category.value}>
                            <p className={`text-base font-medium ${selectedCategory === category.value ? "text-primary" : "text-secondary"}`}>{category.label}</p>
                        </button>
                    ))}
                </div>

                {/* Prices */}
                <div className="w-full hidden flex-col justify-start items-start gap-y-2 mt-5 lg:flex">
                    <p className="text-primary text-base font-semibold tracking-[1px] uppercase pb-3">Price Range</p>
                    {dataPriceRange?.map((price, index) => (
                        <div className={`flex flex-row justify-between items-center w-full ${selectedPriceRange === price.value ? "animate-fade-in-up" : ""}`} key={index}>
                            <p className={`text-base font-medium ${selectedPriceRange === price.value ? "text-primary" : "text-secondary"}`}>{price.label}</p>
                            <CheckboxInput
                                onChange={() => {
                                    onSelectPriceRange(price.value)
                                    setSelectedPriceRange(price.value)
                                }}
                                value={selectedPriceRange}
                                checked={selectedPriceRange === price.value}
                            />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const _RenderFilterContentMobile = () => {
        return (
            <div className="lg:w-[280px] w-full flex flex-col mt-5 h-[200px] overflow-y-scroll bg-white shadow-2xl px-4 rounded-lg">
                <p className="text-primary text-base font-semibold tracking-[1px] uppercase pb-3 mt-3 w-full text-left">Category</p>
                <div className="flex flex-col w-full justify-start items-start mt-3 gap-y-2">
                    {dataCategories?.map((category) => (
                        <button className={`w-full cursor-pointer text-left ${selectedCategory === category.value ? "border-b-2 border-primary pb-2 animate-fade-in-up" : ""}`}
                            onClick={() => {
                                onSelectCategory(category.value)
                                setSelectedCategory(category.value)
                            }} key={category.value}>
                            <p className={`text-sm font-medium ${selectedCategory === category.value ? "text-primary" : "text-secondary"}`}>{category.label}</p>
                        </button>
                    ))}
                </div>

                {/* Prices */}
                <div className="w-full flex flex-col justify-start items-start gap-y-2 mt-5">
                    <p className="text-primary text-base font-semibold tracking-[1px] uppercase pb-3">Price Range</p>
                    {dataPriceRange?.map((price, index) => (
                        <div className={`flex flex-row justify-between items-center w-full ${selectedPriceRange === price.value ? "animate-fade-in-up" : ""}`} key={index}>
                            <p className={`text-sm font-medium ${selectedPriceRange === price.value ? "text-primary" : "text-secondary"}`}>{price.label}</p>
                            <CheckboxInput
                                onChange={() => {
                                    onSelectPriceRange(price.value)
                                    setSelectedPriceRange(price.value)
                                }}
                                value={selectedPriceRange}
                                checked={selectedPriceRange === price.value}
                            />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Desktop Version */}
            <div className="hidden lg:flex flex-row gap-x-2 mb-5">
                <Image src="/images/icons/ic-filtering.svg" alt="Filter" width={16} height={16} style={{ width: 'auto', height: 'auto' }} />
                <p className="text-black font-semibold text-lg tracking-[1px]">
                    Filters
                </p>
            </div>
            {/* Mobile Version */}
            <BasicButton onClick={() => {
                setIsOpen(!isOpen)
            }} type="button" className="bg-transparent w-full lg:hidden flex-row justify-center items-center border-primary border-2 rounded-[10px] p-4">
                <div className="flex flex-row gap-x-2 justify-center items-center">
                    <Image src="/images/icons/ic-filtering.svg" alt="Filter" width={16} height={16} style={{ width: 'auto', height: 'auto' }} />
                    <p className="text-primary text-base font-semibold tracking-[1px]">
                        Filter & Sort
                    </p>
                </div>
            </BasicButton>

            {/* Render Desktop filter if NOT mobile */}
            {!isMobile && _RenderFilterContentDesktop()}

            {/* Render Mobile filter if mobile AND isOpen is true */}
            {isMobile && isOpen && _RenderFilterContentMobile()}

        </>
    )
}