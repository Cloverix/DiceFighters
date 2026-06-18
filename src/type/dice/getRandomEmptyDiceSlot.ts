import type {Dice} from "./Dice.ts";
import {getEmptyDiceSlots} from "./getEmptyDiceSlots.ts";
import {getRandomInt} from "../../util/function/getRandomInt.ts";

//Gives random slot of the given dice that is empty (no spell equipped)
//If all slots are occupied, returns null
export function getRandomEmptyDiceSlot(dice: Dice): number | null {
    const emptySlots: number[] = getEmptyDiceSlots(dice);
    if (emptySlots.length === 0) {
        return null;
    }
    const randomIndex = getRandomInt(0, emptySlots.length - 1);
    return emptySlots[randomIndex];
}