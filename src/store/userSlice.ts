import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "./types";





const userInfo: User = {
  name: "kmla mahara",
  age: 20
}

const userSlice = createSlice({
  name: "user",
  initialState: userInfo,

  reducers: {
    setName(state: User, action: PayloadAction<User>) {
      state.name = "hhehehe"
    },
    setAge(state: User, action: PayloadAction<User>) {
      state.age = 90
    }
  }
})
export const { setName, setAge } = userSlice.actions
export default userSlice.reducer