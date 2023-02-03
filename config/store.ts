import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import enemyReducer from "./enemySlice";
import menaceReducer from "./menaceSlice";
import heroReducer from "./heroSlice";
import gameReducer from "./gameSlice";

export const rootReducer = combineReducers({
  enemy: persistReducer({ key: "enemy", storage }, enemyReducer),
  menace: persistReducer({ key: "menace", storage }, menaceReducer),
  hero: persistReducer({ key: "hero", storage }, heroReducer),
  game: persistReducer({ key: "game", storage }, gameReducer),
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;

export default store;
