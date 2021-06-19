import userReducer from '../features/userSlice';
import appReducer from '../features/appSlice'
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        user: userReducer,
        app: appReducer,
    },
});