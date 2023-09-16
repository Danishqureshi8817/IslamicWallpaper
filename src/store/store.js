import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './cartSlice'
import productSlice from './productSlice';
import CategorySlice from './CategorySlice';
import wallpaperSlice from './wallpaperSlice';
export const store = configureStore({
  reducer: {

wallPaper:wallpaperSlice,
cat:CategorySlice,
cart: cartSlice,
products:productSlice

  }

})

// Infer the `RootState` and `AppDispatch` types from the store itself
export  default store;