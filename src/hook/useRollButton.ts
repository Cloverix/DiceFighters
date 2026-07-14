import { useCallback, useEffect, useRef, useState } from "react";
import type { Target } from "../type/gameState/GameState";
import type { StartRollingFunc } from "./useDiceRoll";

export function useRollButton(
    updateRollResults: (results: Map<number, number>, target: Target) => void,
    handleTakeTurn: () => void
) {
    const [disabled, setDisabled] = useState(false);

    const enemyTurnDelayId = useRef<number | null>(null)

    //Key - diceId, value - roll result on that dice
    const playerRollResults = useRef<Map<number, number>>(new Map());
    const playerResultsCount = useRef(0);
    
    const enemyRollResults = useRef<Map<number, number>>(new Map());
    const enemyResultsCount = useRef(0);

    const resetResults = useCallback(() => {
        playerRollResults.current = new Map();
        playerResultsCount.current = 0;
        enemyRollResults.current = new Map();
        enemyResultsCount.current = 0;
    }, [])

    const onPlayerTurnComplete = useCallback((enemyRollFunctions: Map<number, StartRollingFunc>) => {
        enemyTurnDelayId.current = setTimeout(() => {
            for (const [diceId, fn] of enemyRollFunctions.entries()) { 
                fn(1200, (result: number) => {
                    enemyRollResults.current.set(diceId, result);
                    enemyResultsCount.current++;
                    if (enemyResultsCount.current === enemyRollFunctions.size) {
                        updateRollResults(enemyRollResults.current, 'enemy');
                        handleTakeTurn();
                        setDisabled(false);
                    }
                });
            };
        }, 500);
    }, [updateRollResults, handleTakeTurn])

    const onRollClick = useCallback((
        playerRollFunctions: Map<number, StartRollingFunc>,
        enemyRollFunctions: Map<number, StartRollingFunc>
    ) => {
        if (disabled) {
            return;
        }
        
        resetResults();
        setDisabled(true);
        
        for (const [diceId, fn] of playerRollFunctions.entries()) {
            fn(1200, (result: number) => {
                playerRollResults.current.set(diceId, result);
                playerResultsCount.current++;
                if (playerResultsCount.current === playerRollFunctions.size) {
                    updateRollResults(playerRollResults.current, 'player');
                    handleTakeTurn();
                    onPlayerTurnComplete(enemyRollFunctions);
                }
            });
        };
    }, [disabled, updateRollResults, handleTakeTurn, onPlayerTurnComplete, resetResults]);

    const cleanup = useCallback(() => {
        if (enemyTurnDelayId.current) {
            clearTimeout(enemyTurnDelayId.current);
            enemyTurnDelayId.current = null;
        }
        setDisabled(false);
    }, []);

    useEffect(() => {
        return cleanup;
    }, [cleanup]);

    return {disabled, onRollClick};
}