import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IProduct, IProducts } from "../pages/product/types/types";
import { Status } from "../globals/types/types";
import type { AppDispatch } from "./store";
import API from "../http";
import { setStatus } from "./authSlice";






const initialState: IProducts = {
  products: [],
  status: Status.LOADING
}




const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts(state: IProducts, action: PayloadAction<IProduct[]>) {
      state.products = action.payload;
    },
    setProductStatus(state: IProducts, action: PayloadAction<Status>) {
      state.status = action.payload;
    }
  }
});


export const { setProductStatus, setProducts } = productSlice.actions
export default productSlice.reducer

export function fetchproducts() {
  return async function fetchProductThunk(dispatch: AppDispatch) {
    try {
      const response = await API.get("/product")
      if (response.status === 200) {
        dispatch(setProductStatus(Status.SUCCESS))
        dispatch(setProducts(response.data.data))
      }
      else {
        dispatch(setStatus(Status.ERROR))
      }
    } catch (error) {
      console.log(error)
      dispatch(setStatus(Status.ERROR))
    }
  }
}