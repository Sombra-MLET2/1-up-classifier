import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import sessionService from "../../services/sessions.client";

export interface SessionState {
  user: any;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: SessionState = {
  user: null,
  status: 'idle',
  error: null,
};

export const login = createAsyncThunk(
  "session/login",
  async ({ username, password }: { username: string; password: string }) => {
    const response = await sessionService.login(username, password);
    return response.data;
  }
);

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message!;
      });
  },
});

export default sessionSlice.reducer;