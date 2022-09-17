import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null
  },
  reducers: {
    updateUser: (state, action) => {
      state.data = {
        ...state.data,
        ...action.payload
      }
    }
  },
})

export const {
  updateUser,
} = userSlice.actions

export default userSlice