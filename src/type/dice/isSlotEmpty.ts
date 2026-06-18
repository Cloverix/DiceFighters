import type {Dice} from "./Dice.ts";

//Slot is 1-indexed
export function isSlotEmpty(dice: Dice, slot: number): boolean {
    return dice.equippedSpells.get(slot - 1) === null;
}