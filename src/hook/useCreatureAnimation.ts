import {useCallback, useRef, useState} from "react";
import type {Target} from "../type/gameState/GameState.ts";

/**
 * @param target - who to apply animation to
 */
export function useCreatureAnimation(target: Target) {
    const [offsetX, setOffsetX] = useState(0);

    const timeoutId = useRef<number | null>(null);

    const triggerCastAnimation = useCallback(() => {
        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
            timeoutId.current = null;
        }

        const offset: number = target === 'player' ? 30 : -30;
        setOffsetX(offset);
        timeoutId.current = setTimeout(() => {
            setOffsetX(0);
        }, 250);
    }, [target]);

    const cleanup = useCallback(() => {
        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
            timeoutId.current = null;
        }
    }, []);

    return {offsetX, triggerCastAnimation, cleanup};
}