import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IProduct, IProducts } from "../pages/product/types/types";
import { Status } from "../globals/types/types";
import type { AppDispatch } from "./store";
import type { RootState } from "./store";
import { API } from "../http";






const initialState: IProducts = {
  products: [],
  status: Status.LOADING,
  product: null,
  totalProductsCount: 0
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
    },
    setSingleProduct(state: IProducts, action: PayloadAction<IProduct>) {
      state.product = action.payload;
    },
    setTotalProductsCount(state: IProducts, action: PayloadAction<number>) {
      state.totalProductsCount = action.payload;
    }
  }
});


export const { setProductStatus, setProducts, setSingleProduct, setTotalProductsCount } = productSlice.actions
export default productSlice.reducer

export function fetchproducts(page?: number, limit?: number) {
  return async function fetchProductThunk(dispatch: AppDispatch, getState: () => RootState) {
    try {
      let url = "/product";
      if (page && limit) {
        url += `?page=${page}&limit=${limit}`;
      }

      const response = await API.get(url)
      if (response.status === 200) {
        dispatch(setProductStatus(Status.SUCCESS))
        
        if (page && page > 1) {
          const currentProducts = getState().products.products;
          // Create a Map to prevent duplicates just in case admin adds product while user scrolls
          const newProducts = response.data.data;
          const merged = [...currentProducts];
          for (const p of newProducts) {
             if (!merged.find(existing => existing.id === p.id)) {
                 merged.push(p);
             }
          }
          dispatch(setProducts(merged));
        } else {
          dispatch(setProducts(response.data.data))
        }

        if (response.data.totalCount !== undefined) {
           dispatch(setTotalProductsCount(response.data.totalCount));
        }
      }
      else {
        dispatch(setProductStatus(Status.ERROR))
      }
    } catch (error) {
      console.log(error)
      dispatch(setProductStatus(Status.ERROR))
    }
  }
}

export function fetchSingleProduct(id: string) {
  return async function fetchSingleProductThunk(dispatch: AppDispatch, getState: () => RootState) {
    const store = getState()
    const productExists = store.products.products.find((product: IProduct) => product.id === id)

    if (productExists) {
      dispatch(setSingleProduct(productExists))
      dispatch(setProductStatus(Status.SUCCESS))
    }
    else {
      try {
        const response = await API.get("/product/" + id);

        if (response.status === 200) {
          dispatch(setProductStatus(Status.SUCCESS));
          dispatch(setSingleProduct(response.data.data[0]));
          console.log("Fetched product:", response.data.data[0]);
        } else {
          dispatch(setProductStatus(Status.ERROR));
        }
      } catch (error) {
        console.log(error);
        dispatch(setProductStatus(Status.ERROR));
      }
    }

  };
}