import { createSlice } from "@reduxjs/toolkit"

const progressSlice = createSlice({
  name: "progress",
  initialState: {
    settingsModalOpen: false,
    favoriteNotes: [50],
  },
  reducers: {
    addFavorite: (state, action) => {
      state.favoriteNotes.push(action.payload)
    },
    toggleSettingsModal: (state) => {
      state.settingsModalOpen = !state.settingsModalOpen
    }
  },
})

export const {
  addFavorite: addFavorite,
  toggleSettingsModal
} = progressSlice.actions

export default progressSlice