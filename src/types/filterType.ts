export type FilterType = {
    dataCategories: CategoryInterface[]
    dataPriceRange: PriceRangeInterface[]
    onSelectCategory: (value: string) => void
    onSelectPriceRange: (value: PriceValueInterface | undefined) => void
}

export interface CategoryInterface {
    label: string;
    value: string;
}

export interface PriceValueInterface {
    min: number;
    max: number;
}

export interface PriceRangeInterface {
    label: string;
    value: PriceValueInterface;
}