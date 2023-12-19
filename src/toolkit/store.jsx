import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './Slices/ProductsSlice';
import categoriesReducer from './Slices/CategoriesSlice';
import cartReducer from './Slices/CartSlice';
import wishlistReducer from './Slices/WishlistSlice';
import UserReducer from './Slices/UserSlice';
const store = configureStore({
    reducer: {
        products: productsReducer,
        categories: categoriesReducer,
        cart: cartReducer,
        wishlist: wishlistReducer,
        user: UserReducer,
    },
});

export default store;
