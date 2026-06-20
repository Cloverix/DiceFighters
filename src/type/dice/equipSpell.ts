import type {Spell} from "../spell/Spell.ts"
import type {Creature} from "../creature/Creature.ts";
import {hasSpell} from "../../util/function/hasSpell.ts";
import type {Dice} from "./Dice.ts";
import {cloneDice} from "./cloneDice.ts";

//Returns a deep copy of the dice if equipped correctly, else returns null.
//Slot is 1-indexed. Mutates dice object
export function equipSpell(spell: Spell | null, creature: Creature, dice: Dice, slot: number): Dice | null {
    if (spell !== null && spell.category?.includes('unique') && hasSpell(creature, spell.name)) {
        return null;
    }
    const diceCopy = cloneDice(dice);
    const equipResult: boolean = diceCopy.equippedSpells.set(spell, slot - 1);
    return equipResult ? diceCopy : null;
}