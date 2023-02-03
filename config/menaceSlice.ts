import { createSlice } from "@reduxjs/toolkit";

export type MenaceProps = {
  level: number;
  turn: number;
};

const initialState: MenaceProps = {
  level: 10,
  turn: 1,
};

const menaceSlice = createSlice({
  name: "menace",
  initialState,
  reducers: {
    increseTurn(state: MenaceProps) {
      state.turn = state.turn + 1;
    },
    increseMenace(state: MenaceProps, { payload }) {
      state.level = state.level + payload;
    },
    decreaseMenace(state: MenaceProps, { payload }) {
      state.level = state.level - payload;
    },
    restoreMenaceState(state: MenaceProps) {
      state.level = initialState.level;
      state.turn = initialState.turn;
    },
  },
});

export const { increseTurn, increseMenace, decreaseMenace, restoreMenaceState } = menaceSlice.actions;

export default menaceSlice.reducer;
