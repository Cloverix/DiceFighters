import type {Dice} from "../../type/dice/Dice.ts";
import {getRandomInt} from "./getRandomInt.ts";

/**
 * Gives a random dice face except those listed in except parameter.
 * Returns 1 if except parameter restricts all possible roll outcomes.
 * @param dice - a dice to roll
 * @param except - a list of numbers that won't be returned
 */
export function getRollResultExcept(dice: Dice, except: number[]): number {
    const facesCount: number = dice.faceCount;
    if (except.length >= facesCount) {
        return 1;
    }

    const possibleResults: number[] = [];
    for (let i = 1; i <= facesCount; i++) {
        if (!except.includes(i)) {
            possibleResults.push(i);
        }
    }
    const randomIndex = getRandomInt(0, possibleResults.length - 1);
    return possibleResults[randomIndex];
}