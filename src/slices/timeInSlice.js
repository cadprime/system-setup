import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  timeIn: [],
};

export const timeInSlice = createSlice({
  name: "timeIn",
  initialState,
  reducers: {
    // Actions
    addTimeIn: (state, action) => {
      state.timeIn = [...state.timeIn, action.payload];
    },
    removeBasket: (state, action) => {
      const index = state.timeIn.findIndex(
        (basketItem) => basketItem.id === action.payload.id
      );

      let newBasket = [...state.timeIn];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(`cant remove ${action.payload.id} test`);
      }

      state.timeIn = newBasket;
    },
    // removeFromBasket: (state, action) => {},
  },
});

export const { addTimeIn } = timeInSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectTimeIn = (state) => state.timeIn.timeIn;

export default timeInSlice.reducer;
