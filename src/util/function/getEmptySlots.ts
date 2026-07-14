import type {Dice} from "../../type/dice/Dice.ts";

/**
 * Returns numbers of empty slots on a dice.
 * @param dice - a dice to get empty slots from
 */
export function getEmptySlots(dice: Dice): number[] {
    const spells = dice.equippedSpells.items;
    console.log(`getEmptySlots: spells: ${[...spells.entries()].map(entry => [entry[0], entry[1]?.name])}`);
    const emptySlots: number[] = [];
    for (const [key, value] of spells.entries()) {
        if (value === null) {
            emptySlots.push(key + 1);
        }
    }
    console.log(`getEmptySlots: final emptySlots: ${emptySlots}`);
    return emptySlots;
}