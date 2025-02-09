import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
    persistStore, persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import authReduser from "./auth/AuthSlice"
import catagoryReducer from "./catagory/catagorySlice"
import productReducer from "./product/productSlice"
import cartReducer from "./cart/cartSlice"
import wishlistReducer from "./wishlist/wishlistSlice"
import orderReducer from "./order/orderSlice"



const authPersistConfig = {
    key: 'auth',
    storage,
    whitelist: ["user", "accessToken"]
}

const catagoryPersistConfig = {
    key: 'catagory',
    storage,
    whitelist: ["Catagories"]
}

const productPersistConfig = {
    key: 'product',
    storage,
    whitelist: ["products", "oneProduct"]
}

const cartPersistConfig = {
    key: 'cart',
    storage,
    whitelist: ["cartIds", "cartProducts"]
}

const wishlistPersistConfig = {
    key: 'wishlist',
    storage,
    whitelist: ["wishlistIds"]
}

const orderPersistConfig = {
    key: 'order',
    storage,
    whitelist: ["OneOrder"]
}


const rootReducer = combineReducers({
    auth: persistReducer(authPersistConfig, authReduser),
    catagory: persistReducer(catagoryPersistConfig, catagoryReducer),
    product: persistReducer(productPersistConfig, productReducer),
    cart: persistReducer(cartPersistConfig, cartReducer),
    wishlist: persistReducer(wishlistPersistConfig, wishlistReducer),
    order: persistReducer(orderPersistConfig, orderReducer),


})



export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware(
            {
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                },
            }
        )
})





// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)
