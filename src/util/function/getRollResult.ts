import type {Dice} from "../../type/dice/Dice.ts";
import {getRandomInt} from "./getRandomInt.ts";

//Gives a random outcome of a dice roll
export function getRollResult(dice: Dice): number {
    const max: number = dice.faceCount;
    return getRandomInt(1, max);
}