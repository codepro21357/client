import { ICoinDetails, ICryptoDetails } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  cryptoDetails: null | ICryptoDetails;
}

const initialState: IInitialState = {
  cryptoDetails: null,
};

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    addCryptoDetails: (state, action: PayloadAction<ICryptoDetails>) => {
      state.cryptoDetails = action.payload;
    },
  },
});

export const { addCryptoDetails } = cryptoSlice.actions;
export default cryptoSlice.reducer;
