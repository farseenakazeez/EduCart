import { createSlice } from "@reduxjs/toolkit"
import { updateCart } from "../utils/cartUtils";
const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : { 
    cartItems: [], 
    shippingAddress: {},
     paymentMethod: "paypal" 
    };

const cartslice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {
            const item = action.payload;
            const existingItem = state.cartItems.find((x) => x._id === item._id);
            if (existingItem) {
                state.cartItems = state.cartItems.map((x) => {
                    return x._id === existingItem._id ? item : x;
                });
            } else {
                state.cartItems = [...state.cartItems, item];
            }

            return updateCart(state, item);

        },
        removeFromCart(state, action) {
            state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
            return updateCart(state);
        },

        saveShippingAddress(state, action) {
            state.shippingAddress = action.payload;
            localStorage.setItem("cart", JSON.stringify(state));
        },
        savePaymentMethod(state, action) {
            state.paymentMethod = action.payload;
            localStorage.setItem("cart", JSON.stringify(state));
        },
        clearCartItems(state) {
            state.cartItems=[];
            localStorage.removeItem("cart");
        }
    },
});
export const {
    addToCart,
    removeFromCart,
    saveShippingAddress,
    savePaymentMethod,
    clearCartItems
} = cartslice.actions;
export default cartslice.reducer;