import { createSlice } from "@reduxjs/toolkit";

export type GameProps = {
  hours: number;
  minutes: number;
  hasActiveGame: boolean;
  isRunning: boolean;
};

const initialState: GameProps = {
  hours: 0,
  minutes: 0,
  hasActiveGame: false,
  isRunning: false,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    startGame(state: GameProps) {
      state.hasActiveGame = true;
      state.isRunning = true;
    },
    stopGame(state: GameProps) {
      state.hasActiveGame = false;
      state.isRunning = false;
      state.hours = 0;
      state.minutes = 0;
    },
    pauseGame(state: GameProps) {
      state.isRunning = false;
    },
    updateTime(state: GameProps, { payload }) {
      state.hours = payload.hours;
      state.minutes = payload.minutes;
      state.isRunning = payload.isRunning;
    },
  },
});

export const { startGame, stopGame, pauseGame, updateTime } = gameSlice.actions;

export default gameSlice.reducer;
