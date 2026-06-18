import type {Spell} from "../spell/Spell.ts";
import type {Dice} from "./Dice.ts";

//Returns true if equipped correctly.
//Slot is 1-indexed
export function equipSpell(spell: Spell | null, dice: Dice, slot: number): boolean {
    return dice.equippedSpells.set(spell, slot - 1);
}