import {useCallback, useEffect, useRef, useState} from "react";
import type {Dice} from "../type/dice/Dice.ts";
import {getRollResult} from "../util/function/getRollResult.ts";
import {getSpellSpriteByRollResult} from "../util/function/getSpellSpriteByRollResult.ts";
import {getRollResultExcept} from "../util/function/getRollResultExcept.ts";

/**
 * @param dice - dice to use
 * @param initialRoll - initial roll result
 * @param initialSprite - initial sprite
 */
export function useSpellSprite(dice: Dice, initialRoll: number, initialSprite: string) {
    const [sprite, setSprite] = useState(initialSprite);
    const [finalRollResult, setFinalRollResult] = useState(initialRoll);
    const intervalId = useRef<number | null>(null);
    const timeoutId = useRef<number | null>(null);

    const startRolling = useCallback(() => {
        if (intervalId.current) return;

        let lastRoll = finalRollResult;

        intervalId.current = setInterval(() => {
            const newRoll = getRollResultExcept(dice, [lastRoll]);
            const cycledSprite = getSpellSpriteByRollResult(dice, newRoll);
            lastRoll = newRoll;
            setSprite(cycledSprite);
        }, 100);

        timeoutId.current = setTimeout(() => {
            if (intervalId.current) {
                clearInterval(intervalId.current);
                intervalId.current = null;
            }

            const finalRoll = getRollResult(dice);
            const finalSprite = getSpellSpriteByRollResult(dice, finalRoll);
            lastRoll = finalRoll;
            setFinalRollResult(finalRoll);
            setSprite(finalSprite);
        }, 1000);
    }, [dice, finalRollResult]);

    const cleanup = useCallback(() => {
        if (intervalId.current) {
            clearInterval(intervalId.current);
            intervalId.current = null;
        }
        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
            timeoutId.current = null;
        }
    }, []);

    useEffect(() => {
        return cleanup;
    }, [cleanup]);

    return {sprite, finalRollResult, startRolling, cleanup};
}