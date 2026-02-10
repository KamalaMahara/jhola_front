import { createSlice } from "@reduxjs/toolkit";
import type { product } from "./types";
import type { PayloadAction } from "@reduxjs/toolkit";

const productInfo: product = {
  products: []
}

const productSlice = createSlice({
  name: "product",
  initialState: productInfo,
  reducers: {
    setProduct(state: product, action: PayloadAction<product>) {
      state.products = [
        {
          productName: " iphone 17",
          qty: 100
        }
      ]
    }
  },

})
export const { setProduct } = productSlice.actions
export default productSlice.reducer