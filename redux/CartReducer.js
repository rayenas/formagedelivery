
import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {


      const { _id, name, price } = action.payload;
      const existingItem = state.cart.find(item => item._id === _id);
    
      if (existingItem) {
        // Item already exists in the cart, increment its quantity
        existingItem.quantity += 1;
      } else {
        // Item does not exist in the cart, add it with quantity 1
        state.cart.push({ _id, name, price, quantity: 1 });
      }
    },
    


    
    removeFromCart: (state, action) => {
      const { _id, } = action.payload;
      state.cart = state.cart.filter((item) => item._id !== _id);
    },
    


    incrementQuantity: (state, action) => {
      const { _id, } = action.payload;
      const productToUpdate = state.cart.find((item) => item._id === _id);
    
      if (productToUpdate) {
        // Decrement the quantity of the specific product, ensuring it doesn't go below zero
        
          productToUpdate.quantity += 1;
        
      }
      
    },
    
    decrementQuantity: (state, action) => {
      const { _id, } = action.payload;
      const productToUpdate = state.cart.find((item) => item._id === _id);
    
      if (productToUpdate) {
        // Decrement the quantity of the specific product, ensuring it doesn't go below zero
        if (productToUpdate.quantity > 0) {
          productToUpdate.quantity -= 1;
        }
      }
    },
    
    cleanCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, cleanCart } = cartSlice.actions;

export default cartSlice.reducer;
