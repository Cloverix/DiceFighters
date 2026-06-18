import type {Dice} from "./Dice.ts";

//Gives all slots on a given dice that are empty (no spell equipped)
export function getEmptyDiceSlots(dice: Dice): number[] {
    const emptySlots: number[] = [];
    dice.equippedSpells.items.forEach((value, key) => {
        if (value === null) emptySlots.push(key + 1);
    })
    return emptySlots;
}