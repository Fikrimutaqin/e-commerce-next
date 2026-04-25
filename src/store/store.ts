import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import appReducer from './slices/appSlice';
import categoryReducer from './slices/categorySlice';
import priceReducer from './slices/priceSlice';
import cartReducer from './slices/cartSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'], // Hanya simpan keranjang di localStorage
};

const rootReducer = combineReducers({
  app: appReducer,
  category: categoryReducer,
  price: priceReducer,
  cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, // Penting untuk redux-persist
      }),
  });
};

export const persistor = (store: AppStore) => persistStore(store);

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch'];
