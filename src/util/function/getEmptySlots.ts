import type {Dice} from "../../type/dice/Dice.ts";

/**
 * Returns numbers of empty slots on a dice.
 * @param dice - a dice to get empty slots from
 */
export function getEmptySlots(dice: Dice): number[] {
    const spells = dice.equippedSpells.items;
    const emptySlots: number[] = [];
    for (const [key, value] of spells.entries()) {
        if (value === null) {
            emptySlots.push(key + 1);
        }
    }
    return emptySlots;
}