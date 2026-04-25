import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategoryInterface } from '@/types/filterType';

interface CategoryState {
  categories: CategoryInterface[];
}

const initialState: CategoryState = {
  categories: [],
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<CategoryInterface[]>) => {
      state.categories = action.payload;
    },
    clearCategories: (state) => {
      state.categories = [];
    },
  },
});

export const { setCategories, clearCategories } = categorySlice.actions;

export default categorySlice.reducer;
