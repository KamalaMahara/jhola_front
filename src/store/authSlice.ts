import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../globals/types/types";
import axios from "axios";
import type { AppDispatch } from "./store";



interface ILoginUser {
  email: string,
  password: string
}



interface IUser {

  username: string,
  email: string,
  password: string

}

interface IAuthState {
  user: IUser,
  status: Status
}

const initialState: IAuthState = {
  user: {
    username: "",
    email: "",
    password: ""

  },
  status: Status.LOADING
}

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUser(state: IAuthState, action: PayloadAction<IUser>) {
      state.user = action.payload
    },
    setStatus(state: IAuthState, action: PayloadAction<Status>) {
      state.status = action.payload
    }
  }

})

export const { setUser, setStatus } = authSlice.actions
export default authSlice.reducer


//Async thunk action to register a user
export function registerUser(data: IUser) {
  return async function registerUserThunk(dispatch: AppDispatch) {
    try {
      const response = await axios.post("http://localhost:8000/register", data)
      console.log(response)
      if (response.status === 201) {
        dispatch(setStatus(Status.SUCCESS))
        dispatch(setUser(data))
      }
      else {
        dispatch(setStatus(Status.ERROR))
      }

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Backend error:", error.response?.data);
      }

      dispatch(setStatus(Status.ERROR))
    }
  }
}

export function loginUser(data: ILoginUser) {
  return async function loginUserThunk(dispatch: AppDispatch) {
    try {
      const response = await axios.post("http://localhost:8000/login", data)
      console.log(response)
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS))
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

export function forgotPassword(data: { email: string | null }) {
  return async function forgotPasswordThunk(dispatch: AppDispatch) {
    try {
      const response = await axios.post("http://localhost:8000/forgot-password", data)
      console.log(response)
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS))
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

