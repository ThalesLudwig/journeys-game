import { createSlice } from "@reduxjs/toolkit";
import { HeroType } from "../types/HeroType";

export type HeroProps = {
  heroes: HeroType[];
  selected: HeroType;
};

const selectedInitialState: HeroType = {
  id: "",
  name: "",
  xp: 35,
};

const initialState: HeroProps = {
  heroes: [],
  selected: selectedInitialState,
};

const heroSlice = createSlice({
  name: "hero",
  initialState,
  reducers: {
    addHero(state: HeroProps, { payload }) {
      state.heroes = [...state.heroes, payload];
    },
    removeHero(state: HeroProps) {
      state.heroes = state.heroes.filter((hero) => hero.id !== state.selected.id);
      state.selected = selectedInitialState;
    },
    selectHero(state: HeroProps, { payload }) {
      state.selected = state.heroes.find((hero) => hero.id == payload.id);
    },
    updateHero(state: HeroProps, { payload }) {
      state.selected = payload;
      state.heroes = state.heroes.map((hero) => {
        if (hero.id == payload.id) {
          return payload;
        }
        return hero;
      });
    },
    restoreHeroesState(state: HeroProps) {
      state.selected = initialState.selected;
      state.heroes = initialState.heroes;
    },
  },
});

export const { addHero, removeHero, selectHero, updateHero, restoreHeroesState } = heroSlice.actions;

export default heroSlice.reducer;
