import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import mushroomService from "../../services/mushrooms.client";
import {MushroomDTO, MushroomPageResponse} from "../../types/mushroom";


export interface MushroomState {
    mushrooms: MushroomPageResponse;
    status: 'idle' | 'loading' | 'succeeded' | 'failed' | 'inserted';
    error: string | null;
}

const initialState: MushroomState = {
    mushrooms: {total: 0, page: 0, data: []},
    status: 'idle',
    error: null,
};

export const fetchMushrooms = createAsyncThunk(
    "mushroom/fetchMushrooms",
    async (queryParams: Partial<MushroomDTO>): Promise<MushroomPageResponse> => {
        const response = await mushroomService.fetchMushrooms(queryParams);
        return response.data;
    }
);

export const insertMushroom = createAsyncThunk(
    "mushroom/insertMushroom",
    async (payload: { mushroom: MushroomDTO, token: string }) => {
        const response = await mushroomService.insertMushroom(payload.mushroom, payload.token);
        return response.data;
    }
);

const mushroomSlice = createSlice({
    name: "mushroom",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMushrooms.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchMushrooms.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.mushrooms = action.payload;
            })
            .addCase(fetchMushrooms.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message!;
            })
            .addCase(insertMushroom.pending, (state) => {
                state.status = "loading";
            })
            .addCase(insertMushroom.fulfilled, (state, action) => {
                state.status = "inserted";
                state.mushrooms.data.push(action.payload);
            })
            .addCase(insertMushroom.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message!;
            });
    },
});

export default mushroomSlice.reducer;