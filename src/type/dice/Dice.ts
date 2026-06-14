import type {Spell} from "../spell/Spell.ts";
import type {FixedArray} from "../../util/class/FixedArray.ts";
import type {Sprite} from "../../util/type/Sprite.ts";

export interface Dice {
    edgeCount: number;
    equippedSpells: FixedArray<Spell>;
    sprite: Sprite;
}