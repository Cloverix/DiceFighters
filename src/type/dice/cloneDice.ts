import type {Dice} from "./Dice.ts";
import {FixedMap} from "../../util/class/FixedMap.ts";
import type {Spell} from "../spell/Spell.ts";

/**
 * Makes a deep copy of given Dice object. Id is NOT changed.
 * @param dice - a dice to clone
 */
export function cloneDice(dice: Dice): Dice {
    return {
        ...dice,
        equippedSpells: FixedMap.clone<Spell>(dice.equippedSpells)
    }
}