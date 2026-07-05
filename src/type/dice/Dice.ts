import type {Spell} from "../spell/Spell.ts";
import type {FixedMap} from "../../util/class/FixedMap.ts";

export interface Dice {
    faceCount: DiceEdgeCount;
    equippedSpells: FixedMap<Spell>;        //Null slots are considered Strikes
    sprite: string;                         //Determines an empty-face look of the dice, effectively acting as dice background
}

export type DiceEdgeCount = 4 | 6 | 12 | 20