import type {Dice} from "../dice/Dice.ts";
import type {FixedArray} from "../../util/class/FixedArray.ts";
import type {Sprite} from "../../util/type/Sprite.ts";
import type {Effect} from "../effect/Effect.ts";

export interface Creature {
    id: number;
    hp: number;
    effects: Effect[];
    dices: FixedArray<Dice>;
    sprite: Sprite;
}