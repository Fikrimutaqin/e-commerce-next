export type FilterType = {
    dataCategories: CategoryInterface[]
    dataPriceRange: PriceRangeInterface[]
    onSelectCategory: (value: string) => void
    onSelectPriceRange: (value: any) => void
}

export interface CategoryInterface {
    label: string;
    value: string;
}

export interface PriceRangeInterface {
    label: string;
    value: any;
}