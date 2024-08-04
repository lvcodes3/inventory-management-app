// redux boilerplate code for next.js apps //

import { useRef } from "react";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
  Provider,
} from "react-redux";
import globalReducer from "@/state";
import { api } from "@/state/api";
import { setupListeners } from "@reduxjs/toolkit/query";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

/* REDUX PERSISTENCE */
// fxn to create a storage handler for environments where window is not defined //
// (ex: server-side rendering in Next.js) //
const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

// choose storage type based on environment (noop for SSR, local storage for client-side) //
const storage =
  typeof window === "undefined"
    ? createNoopStorage()
    : createWebStorage("local");

// configuration for redux-persist //
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["global"], // state slices to be persisted
};

// combine your reducers into one root reducer //
const rootReducer = combineReducers({
  global: globalReducer,
  [api.reducerPath]: api.reducer,
});

// create a persisted reducer using the persistConfig //
const persistedReducer = persistReducer(persistConfig, rootReducer);

/* REDUX STORE */
// fxn to configure and create a Redux store with persisted reducer and additonal middleware (including the API middleware) //
export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(api.middleware),
  });
};

/* REDUX TYPES */
// types for Redux store, state, and dispatch, along with custom hooks for using dispatch and selector //
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/* PROVIDER */
// sets up the Redux store and persistor, and wraps the app with the Redux Provider and PersistGate //
export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // useRef to create a store instance that persists across re-renders //
  const storeRef = useRef<AppStore>();

  // initialize the store if it hasn't been already //
  if (!storeRef.current) {
    storeRef.current = makeStore();
    setupListeners(storeRef.current.dispatch); // set up listeners for RTK query
  }

  // create persistor linked to the store //
  const persistor = persistStore(storeRef.current);

  // wrap the children components with Redux Provider and PersistGate //
  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
