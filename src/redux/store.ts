import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import clientReducer from "./client/clientSlice";
import authReducer from "./auth/authSlice";
import dataReducer from "./data/dataSlice";

import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist';
  import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';


const rootReducer = combineReducers({
    client: clientReducer,
    auth: authReducer,
    data: dataReducer
  });



const persistConfig = {
    key: 'root',
    storage,
  };
  
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  
  export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
  
  export const persistor = persistStore(store);

  
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;