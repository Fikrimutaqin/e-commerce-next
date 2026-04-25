import { PriceRangeInterface } from "@/types/filterType";

export const PRICE_RANGE_LIST: PriceRangeInterface[] = [
    {
        label: "All Price",
        value: 0
    },
    {
        label: "Rp 0 - Rp 100.000",
        value: 100000
    },
    {
        label: "Rp 100.000 - Rp 500.000",
        value: 500000
    },
    {
        label: "Rp 500.000 - Rp 1.000.000",
        value: 1000000
    },
    {
        label: "Rp 1.000.000 - Rp 5.000.000",
        value: 5000000
    },
    {
        label: "Rp 5.000.000 - Rp 10.000.000",
        value: 10000000
    },
    {
        label: "Rp 10.000.000+",
        value: 10000001
    }
];