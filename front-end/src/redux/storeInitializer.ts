import {configureStore} from "@reduxjs/toolkit";
import sessionReducer from './slices/sessionSliceReducer';
import mushroomReducer from './slices/mushroomSliceReducer';
import datasetRdeducer from './slices/datasetSliceReducer';

export const store = configureStore({
    reducer: {
        session: sessionReducer,
        mushroom: mushroomReducer,
        dataset: datasetRdeducer
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;