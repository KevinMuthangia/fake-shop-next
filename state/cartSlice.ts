import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductType } from "@/types";

export interface CartItems {
    quantity: number;
    product: ProductType;
}

export interface CartState {
    cartItems: CartItems[];
    isOpen: boolean;
}

const initialState: CartState = {
    cartItems: [],
    isOpen: false
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        "ADD_TO_CART": (state, action: PayloadAction<CartItems>) => {
            const existingItem = state.cartItems.find((item) => item.product.id === action.payload.product.id);
            if(existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cartItems.push(action.payload);
                action.payload.quantity = 1
            }
        },
        "REMOVE_FROM_CART": (state, action: PayloadAction<CartItems>) => {
            const existingItem = state.cartItems.find((item) => item.product.id === action.payload.product.id);
            if(existingItem) {
                if(existingItem.quantity > 1) {
                    existingItem.quantity -= 1;
                } else {
                    state.cartItems = state.cartItems.filter((item) => item.product.id !== action.payload.product.id);
                }
            }
        },
        "DELETE_FROM_CART": (state, action: PayloadAction<CartItems>) => {
            state.cartItems = state.cartItems.filter((item) => item.product.id !== action.payload.product.id);
        },
        "TOGGLE_CART": (state) => {
            state.isOpen = !state.isOpen
        }
    }
});


export const { ADD_TO_CART, REMOVE_FROM_CART, DELETE_FROM_CART, TOGGLE_CART } = cartSlice.actions;

export default cartSlice.reducer;