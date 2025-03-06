import xhrReducers from "./reducers/xhr";
import cartReducers from "./reducers/cart";
import alertReducers from "./reducers/alert";
import appReducers from "./reducers/app";
import asideMenuReducers from "./reducers/asideMenu";
import userAuthReducers from "./reducers/userAuth";

import {
  combineReducers,
  configureStore,
  createListenerMiddleware,
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistReducer, persistStore, Storage } from "redux-persist";
import { api } from "../services/api";

const reducers = combineReducers({
  xhr: xhrReducers,
  cart: cartReducers,
  alert: alertReducers,
  app: appReducers,
  asideMenu: asideMenuReducers,
  userAuth: userAuthReducers,
  [api.reducerPath]: api.reducer,
});

const PERSIST_KEY = "v1.0";

export const reduxStorage: Storage = {
  setItem: (key, value) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, value);
    }
    return Promise.resolve(true);
  },
  getItem: (key) => {
    if (typeof window !== "undefined") {
      const value = localStorage.getItem(key);
      return Promise.resolve(value);
    }
    return Promise.resolve(null);
  },
  removeItem: (key) => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key);
    }
    return Promise.resolve();
  },
};

const persistConfig = {
  key: `${PERSIST_KEY}-root`,
  storage: reduxStorage,
  whitelist: ["user", "chat", "collection", "moncAir", "suggestions"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const listenerMiddleware = createListenerMiddleware();

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: false,
    }).concat(api.middleware);

    middlewares.push(listenerMiddleware.middleware);

    return middlewares;
  },
});

const persistor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);

export { store, persistor };
