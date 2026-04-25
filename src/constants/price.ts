import { PriceRangeInterface } from "@/types/filterType";

export const PRICE_RANGE: PriceRangeInterface[] = [
    {
        label: "All Price",
        value: { min: 0, max: 100000000 }
    },
    {
        label: "$0 - $100",
        value: { min: 0, max: 100 }
    },
    {
        label: "$101 - $500",
        value: { min: 101, max: 500 }
    },
    {
        label: "$501 - $1000",
        value: { min: 501, max: 1000 }
    },
    {
        label: "> $1000",
        value: { min: 1001, max: 100000000 }
    }
];