import { configureStore } from '@reduxjs/toolkit';
import { api } from '@/redux/services/base-api-service';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
