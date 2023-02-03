import { EnemyType } from "./EnemyType";
import { HeroType } from "./HeroType";

export type StoreType = {
  enemy: {
    enemies: EnemyType[];
    selected: EnemyType;
  };
  hero: {
    heroes: HeroType[];
    selected: HeroType;
  };
  menace: {
    level: number;
    turn: number;
  };
  game: { hours: number; minutes: number; hasActiveGame: boolean; isRunning: boolean };
};

export default StoreType;
