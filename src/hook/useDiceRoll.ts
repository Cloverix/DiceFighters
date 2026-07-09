import {useCallback, useEffect, useRef, useState} from "react";
import type {Dice} from "../type/dice/Dice.ts";
import {getRollResult} from "../util/function/getRollResult.ts";
import {getSpellSpriteByRollResult} from "../util/function/getSpellSpriteByRollResult.ts";
import {getRollResultExcept} from "../util/function/getRollResultExcept.ts";
import defaultSprite from "../assets/sprite/dice/dice-6-side-empty.png"

/**
 * @param dice - dice to use
 * @param initialRoll - initial roll result
 * @param initialSprite - initial sprite
 */
export function useDiceRoll(dice: Dice, initialRoll: number, initialSprite: string) {
    const [sprite, setSprite] = useState(initialSprite);
    const [finalRollResult, setFinalRollResult] = useState(initialRoll);
    const [scale, setScale] = useState(1);
    const intervalId = useRef<number | null>(null);
    const timeoutId = useRef<number | null>(null);
    const scaleTimeoutId = useRef<number | null>(null);

    const startRolling = useCallback(() => {
        if (intervalId.current) return;

        let lastRoll = finalRollResult;

        intervalId.current = setInterval(() => {
            const newRoll = getRollResultExcept(dice, [lastRoll]);
            const cycledSprite = getSpellSpriteByRollResult(dice, newRoll);
            lastRoll = newRoll;
            setSprite(cycledSprite ?? defaultSprite);
        }, 150);

        timeoutId.current = setTimeout(() => {
            if (intervalId.current) {
                clearInterval(intervalId.current);
                intervalId.current = null;
            }

            const finalRoll = getRollResult(dice);
            const finalSprite = getSpellSpriteByRollResult(dice, finalRoll);
            lastRoll = finalRoll;
            setFinalRollResult(finalRoll);
            setSprite(finalSprite ?? defaultSprite);

            setScale(1.1);

            scaleTimeoutId.current = setTimeout(() => {
                setScale(1);
            }, 200)
        }, 1200);
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
        if (scaleTimeoutId.current) {
            clearTimeout(scaleTimeoutId.current);
            scaleTimeoutId.current = null;
        }
        setScale(1);
    }, []);

    useEffect(() => {
        return cleanup;
    }, [cleanup]);

    return {sprite, finalRollResult, scale, startRolling, cleanup};
}