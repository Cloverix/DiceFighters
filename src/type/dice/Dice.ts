import type {Spell} from "../spell/Spell.ts";
import type {FixedMap} from "../../util/class/FixedMap.ts";
import type {Sprite} from "../../assets/sprite/Sprite.ts";

export interface Dice {
    edgeCount: DiceEdgeCount;
    equippedSpells: FixedMap<Spell>;        //Null slots are considered Strikes
    sprite: Sprite;
}

export type DiceEdgeCount = 4 | 6 | 12 | 20