import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PriceRangeInterface } from '@/types/filterType';

interface PriceState {
  priceRanges: PriceRangeInterface[];
}

const initialState: PriceState = {
  priceRanges: [],
};

export const priceSlice = createSlice({
  name: 'price',
  initialState,
  reducers: {
    setPriceRanges: (state, action: PayloadAction<PriceRangeInterface[]>) => {
      state.priceRanges = action.payload;
    },
  },
});

export const { setPriceRanges } = priceSlice.actions;
export default priceSlice.reducer;
