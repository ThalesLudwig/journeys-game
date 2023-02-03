import { createSlice } from "@reduxjs/toolkit";
import { EnemyType } from "../types/EnemyType";

export type EnemyProps = {
  enemies: EnemyType[];
  selected: EnemyType;
};

const selectedInitialState = {
  attack: 0,
  health: 0,
  id: "0",
  magic: 0,
  name: "",
  shield: 0,
  speed: 0,
  baseMagic: 0,
  baseShield: 0,
  baseHealth: 0,
  cost: 0,
};

const initialState: EnemyProps = {
  enemies: [],
  selected: selectedInitialState,
};

const enemySlice = createSlice({
  name: "enemy",
  initialState,
  reducers: {
    addEnemy(state: EnemyProps, { payload }) {
      state.enemies = [...state.enemies, payload];
    },
    removeEnemy(state: EnemyProps) {
      state.enemies = state.enemies.filter((enemy) => enemy.id !== state.selected.id);
      state.selected = selectedInitialState;
    },
    hitEnemy(state: EnemyProps) {
      state.enemies = state.enemies.map((enemy) => {
        if (enemy.id !== state.selected.id || enemy.health === 0) return enemy;
        if (enemy.magic > 0) {
          enemy.magic = enemy.magic - 1;
          state.selected = enemy;
          return enemy;
        }
        if (enemy.shield > 0) {
          enemy.shield = enemy.shield - 1;
          state.selected = enemy;
          return enemy;
        }
        if (enemy.health > 0) {
          enemy.health = enemy.health - 1;
          state.selected = enemy;
          return enemy;
        }
      });
    },
    selectEnemy(state: EnemyProps, { payload }) {
      state.selected = state.enemies.find((enemy) => enemy.id == payload.id);
    },
    restoreMagic(state: EnemyProps) {
      state.enemies = state.enemies.map((enemy) => {
        enemy.magic = enemy.baseMagic;
        return enemy;
      });
    },
    restoreEnemiesState(state: EnemyProps) {
      state.selected = initialState.selected;
      state.enemies = initialState.enemies;
    },
  },
});

export const { addEnemy, removeEnemy, hitEnemy, selectEnemy, restoreMagic, restoreEnemiesState } = enemySlice.actions;

export default enemySlice.reducer;
