import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: 'user',
  initialState: {
    pickupAddress: null,
    pickupPosition: null,
  },
  reducers: {
    updatePickupAddress: (state, action) => {
      state.pickupAddress = action.payload;
    },
    updatePickupPosition: (state, action) => {
      state.pickupPosition = action.payload;
    }
  }
});

export const { updatePickupAddress, updatePickupPosition } = userSlice.actions;
export default userSlice.reducer;
