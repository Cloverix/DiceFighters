import type {Dice} from "../../type/dice/Dice.ts";
import {getRandomInt} from "./getRandomInt.ts";

export function diceRollResult(dice: Dice): number {
    const max: number = dice.edgeCount;
    return getRandomInt(1, max);
}