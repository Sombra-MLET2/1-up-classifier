import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import dsServices from "../../services/datasets.client";
import mushroomServices from "../../services/mushrooms.client";

interface DatasetState {
  loading: boolean;
  error: string | null;
  message: string | null;
}

const initialState: DatasetState = {
  loading: false,
  error: null,
  message: null,
};

export const importDataset = createAsyncThunk(
  'dataset/import',
  async (token: string): Promise<{ message: string }> => {
    const response = await dsServices.importDataset(token)
    return response.data;
  }
);

export const deleteDataset = createAsyncThunk(
  'dataset/delete',
  async (token: string): Promise<{ message: string }> => {
    const response = await dsServices.deleteDataset(token);
    return response.data;
  }
);


export const batchPredict = createAsyncThunk(
  'dataset/batch-predict',
  async () => {
    const response = await mushroomServices.batchPredictMushroom();
    return response.data;
  }
);

const datasetSlice = createSlice({
  name: 'dataset',
  initialState,
  reducers: {
    clearState: (state) => {
      state.loading = false;
      state.error = null;
      state.message = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(importDataset.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    });
    builder.addCase(importDataset.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    });
    builder.addCase(importDataset.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Something went wrong';
    });
    builder.addCase(deleteDataset.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    });
    builder.addCase(deleteDataset.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    });
    builder.addCase(deleteDataset.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Something went wrong';
    });
    builder.addCase(batchPredict.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    });
    builder.addCase(batchPredict.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    });
    builder.addCase(batchPredict.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Something went wrong';
    });
  },
});

export const { clearState } = datasetSlice.actions;
export default datasetSlice.reducer;