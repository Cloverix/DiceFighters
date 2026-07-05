import type {Dice} from "../dice/Dice.ts";
import type {Effect} from "../effect/Effect.ts";

export interface Creature {
    id: number;
    name: string;
    maxHp: number;
    hp: number;
    effects: Effect[];
    dices: Dice[];
    sprite: string;
}

