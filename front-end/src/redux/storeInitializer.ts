import {configureStore} from "@reduxjs/toolkit";
import sessionReducer from './slices/sessionSliceReducer';
import mushroomReducer from './slices/mushroomSliceReducer';

export const store = configureStore({
    reducer: {
        session: sessionReducer,
        mushroom: mushroomReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;