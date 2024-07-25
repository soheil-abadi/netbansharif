import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMainData } from "../services/services";

const initialState = {
  DashboardList: [],
  loading: false,
};

const LandingPageSlice = createSlice({
  name: "LandingPage",
  initialState,
  reducers: {
    setDashboardList: (state, action) => {
      state.DashboardList = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  // Uncomment and complete the extraReducers if async thunks are used
  extraReducers: (builder) => {
    builder
      .addCase(fetchedashboard.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchedashboard.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchedashboard.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setDashboardList } = LandingPageSlice.actions;

export const selectDashboardList = (state) => state.LandingPage.DashboardList;
export const selectLoading = (state) => state.LandingPage.loading;

export default LandingPageSlice.reducer;

// ------------------------api handling for landing page

export const fetchedashboard = createAsyncThunk(
  "LandingPage/fetchDashboard",
  async (token, { dispatch }) => {
    try {
      const response = await getMainData();

      if (response.status === 200) {
        dispatch(setDashboardList(response.data));
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {}
  }
);
