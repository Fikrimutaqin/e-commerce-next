import { createSlice } from '@reduxjs/toolkit';

interface AppState {
  isInitialized: boolean;
  searchQuery: string;
}

const initialState: AppState = {
  isInitialized: false,
  searchQuery: "",
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setInitialized: (state) => {
      state.isInitialized = true;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setInitialized, setSearchQuery } = appSlice.actions;
export default appSlice.reducer;
