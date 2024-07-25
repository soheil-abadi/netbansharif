import { configureStore } from "@reduxjs/toolkit";
import LandingPageSlice from "../Slice/LandingPageSlice";

const store = configureStore({
  reducer: {
    LandingPage: LandingPageSlice,
  },
});

export default store;
