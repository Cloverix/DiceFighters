import type {Spell} from "../spell/Spell.ts";
import type {FixedMap} from "../../util/class/FixedMap.ts";
import type {Sprite} from "../../assets/sprite/Sprite.ts";

export interface Dice {
    edgeCount: number;
    equippedSpells: FixedMap<Spell>;        //Null slots are considered Strikes
    sprite: Sprite;
}